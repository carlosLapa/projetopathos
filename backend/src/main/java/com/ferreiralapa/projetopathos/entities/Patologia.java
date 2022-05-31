package com.ferreiralapa.projetopathos.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_patologia")
public class Patologia implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String tipologia;
	private String dano;

	@Column(columnDefinition = "TEXT")
	private String descricao;
	private String imgUrl;

	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant date;
	private Instant createdAt;

	@ManyToOne
	@JoinColumn(name = "anomalia_id")
	private Anomalia anomalia;

	public Patologia() {
	}

	public Patologia(Long id, String tipologia, String dano, String descricao, String imgUrl, Instant date,
			Instant createdAt, Anomalia anomalia) {
		super();
		this.id = id;
		this.tipologia = tipologia;
		this.dano = dano;
		this.descricao = descricao;
		this.imgUrl = imgUrl;
		this.date = date;
		this.createdAt = createdAt;
		this.anomalia = anomalia;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipologia() {
		return tipologia;
	}

	public void setTipologia(String tipologia) {
		this.tipologia = tipologia;
	}

	public String getDano() {
		return dano;
	}

	public void setDano(String dano) {
		this.dano = dano;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Anomalia getAnomalia() {
		return anomalia;
	}

	public void setAnomalia(Anomalia anomalia) {
		this.anomalia = anomalia;
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
		Patologia other = (Patologia) obj;
		return Objects.equals(id, other.id);
	}

}
