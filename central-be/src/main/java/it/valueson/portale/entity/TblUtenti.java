package it.valueson.portale.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TblUtenti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_utente", unique = true, nullable = false)
    private Long idUser;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String mail;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cognome")
    private String cognome;

}
