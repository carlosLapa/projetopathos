package com.ferreiralapa.projetopathos.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "tb_anomalia")
public class Anomalia implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Aqui talvez faça mais sentido ser um boolean - pois teve consequencia ou nao
    private String consequente;
    private String inconsequente;

    @Column(columnDefinition = "TEXT")
    private String tipologia;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant date;

    /*
     * "Set" (interface) ao invés de "List" - implementa o conceito de conjunto e
     * não aceita // repetições. Ex: a mesma Anomalia não pode pertencer ao mesmo
     * edíficio mais que 1 vez, para assegurar que na tabela intermédia não existam
     * repetições de pares.
     * 
     * a chave estrangeira da tabela onde estou - anomalia_id
     */
//	@ManyToMany
//	@JoinTable(name = "tb_anomalia_edificio", 
//	joinColumns = @JoinColumn(name = "anomalia_id"), 
//	inverseJoinColumns = @JoinColumn(name = "edificio_id"))
//	Set<Edificio> edificios = new HashSet<>();

    @ManyToMany(mappedBy = "anomalias")
    private Set<Edificio> edificios = new HashSet<>();

    /* Para aceder às causas associadas a cada anomalia */
    @ManyToMany(mappedBy = "anomalias")
    private Set<Causa> causas = new HashSet<>();

    @OneToMany(mappedBy = "anomalia")
    private List<Patologia> patologias = new ArrayList<>();

    public Anomalia() {
    }

    public Anomalia(String consequente, String inconsequente, Instant date, String tipologia, String descricao) {
        super();
        this.consequente = consequente;
        this.inconsequente = inconsequente;
        this.date = date;
        this.tipologia = tipologia;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConsequente() {
        return consequente;
    }

    public void setConsequente(String consequente) {
        this.consequente = consequente;
    }

    public String getInconsequente() {
        return inconsequente;
    }

    public void setInconsequente(String inconsequente) {
        this.inconsequente = inconsequente;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Edificio> getEdificios() {
        return edificios;
    }

    public Set<Causa> getCausas() {
        return causas;
    }

    public List<Patologia> getPatologias() {
        return patologias;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Anomalia other = (Anomalia) obj;
        return Objects.equals(id, other.id);
    }

}
