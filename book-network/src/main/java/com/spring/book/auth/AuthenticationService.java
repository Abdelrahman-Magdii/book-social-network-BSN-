package com.spring.book.auth;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.book.email.EmailServices;
import com.spring.book.email.EmailTemplateName;
import com.spring.book.role.RoleRepository;
import com.spring.book.security.JwtService;
import com.spring.book.token.Token;
import com.spring.book.token.TokenRepository;
import com.spring.book.user.User;
import com.spring.book.user.UserRepository;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailServices emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByName("USER")
                // todo - better exception handling
                .orElseThrow(() -> new IllegalStateException("ROLE USER was not initiated"));
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();
        userRepository.save(user);
        sendValidationEmail(user);

    }

    private String generateAndSaveActivationToken(User user) {
        // Generate a token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation");

    }

    private String generateActivationCode(int length) {

        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int rundomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(rundomIndex));
        }

        return codeBuilder.toString();
    }

    public AuthenticationResponse authentication(AuthenticationRequest entity) {

        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        entity.getEmail(), entity.getPassword()));

        var claims = new HashMap<String, Object>();
        var user = (User) auth.getPrincipal();

        claims.put("fullName", user.fullName());

        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    // @Transactional
    public void activateAccount(String token) throws MessagingException {

        var saveToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (LocalDateTime.now().isAfter(saveToken.getExpiresAt())) {
            sendValidationEmail(saveToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email");
        }

        var user = userRepository.findById(saveToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setEnabled(true);
        userRepository.save(user);
        saveToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(saveToken);
    }

}
