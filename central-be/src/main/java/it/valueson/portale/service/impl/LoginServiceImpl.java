package it.valueson.portale.service.impl;

import it.valueson.portale.dto.UserDTO;
import it.valueson.portale.entity.TblUtenti;
import it.valueson.portale.repository.CedolinoRepository;
import it.valueson.portale.repository.UtentiRepository;
import it.valueson.portale.service.CedolinoService;
import it.valueson.portale.service.ILoginService;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class LoginServiceImpl implements ILoginService {

    @Autowired
    private UtentiRepository utentiRepository;

    @Autowired
    private CedolinoService cedolinoService;


    @Override
    public UserDTO executeLogin(UserDTO user) throws Exception {

        TblUtenti utente = utentiRepository.findByMailAndPassword(
                user.getMail(), DigestUtils.sha256Hex(user.getPassword()));
        if(utente != null) {
            user.setPassword(null);
            user.setIdUser(utente.getIdUser());
            user.setCognome(utente.getCognome());
            user.setNome(utente.getNome());
            return user;
        } else {
            throw new Exception("User not found");
        }
    }
    @Override
    public void insertUser(UserDTO userDTO) {
        TblUtenti user = TblUtenti.builder()
                .password(DigestUtils.sha256Hex(userDTO.getPassword()))
                .mail(userDTO.getMail())
                .nome(userDTO.getNome())
                .cognome(userDTO.getCognome())
                .build();
        try {
            utentiRepository.save(user);
        } catch (Exception e) {
            log.error("Error during registration", e);
            throw new RuntimeException("Failed to register user", e);
        }
    }
    @Override
    public TblUtenti findById(Long id) {
        return utentiRepository.findById(id).get();
    }

    public List<TblUtenti> getAllUser() {
        List<TblUtenti> users = utentiRepository.findAll();
        users.forEach(user -> user.setPassword(null));
        return users;
    }
    @Override
    public void deleteUser(Long idUtente) {
        TblUtenti utenti = utentiRepository.findById(idUtente).get();
        utentiRepository.delete(utenti);
    }
    @Override
    public UserDTO findByIdUtente(Long idUser) {
        return mapToDto(utentiRepository.findById(idUser).get());
    }
    // maptodto
    private UserDTO mapToDto (TblUtenti utente){
        return UserDTO.builder()
                .idUser(utente.getIdUser())
                .password(utente.getPassword())
                .mail(utente.getMail())
                .nome(utente.getNome())
                .cognome(utente.getCognome())
                .build();
    }
    @Override
    public UserDTO updateUtente(UserDTO userDTO) {
        TblUtenti user = utentiRepository.findByIdUser(userDTO.getIdUser());
        if (!userDTO.getNome().isEmpty()) {
            user.setNome(userDTO.getNome());
        }
        if (!userDTO.getCognome().isEmpty()){
            user.setCognome(userDTO.getCognome());
        }
        if (!userDTO.getMail().isEmpty()) {
            user.setMail(userDTO.getMail());
        }
        if(userDTO.getPassword() != null){
            if(!userDTO.getPassword().isEmpty()){
                user.setPassword(DigestUtils.sha256Hex(userDTO.getPassword()));
            }
        }
        utentiRepository.save(user);
        return mapToDto(user);
    }

    @Transactional
    @Override
    public void deleteById(Long idUser) {
        cedolinoService.deleteAllForUser(idUser);
        utentiRepository.deleteById(idUser);
    }
}
