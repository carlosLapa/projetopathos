package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;
import java.time.Instant;

import com.ferreiralapa.projetopathos.entities.Edificio;

public class EdificioDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String localizacao;
	private String tipologia;
	private String nome;
	private String utilizacao;
	private String arquitetura;
	private Integer piso;
	private String fracao;
	private String imgUrl;
	private Instant date;
	private Instant createdAt;

	public EdificioDTO() {
	}

	public EdificioDTO(Long id, String localizacao, String tipologia, String nome, String utilizacao,
			String arquitetura, Integer piso, String fracao, String imgUrl, Instant date, Instant createdAt) {
		this.id = id;
		this.localizacao = localizacao;
		this.tipologia = tipologia;
		this.nome = nome;
		this.utilizacao = utilizacao;
		this.arquitetura = arquitetura;
		this.piso = piso;
		this.fracao = fracao;
		this.imgUrl = imgUrl;
		this.date = date;
		this.createdAt = createdAt;
	}

	public EdificioDTO(Edificio entity) {
		this.id = entity.getId();
		this.localizacao = entity.getLocalizacao();
		this.tipologia = entity.getTipologia();
		this.nome = entity.getNome();
		this.utilizacao = entity.getUtilizacao();
		this.arquitetura = entity.getArquitetura();
		this.piso = entity.getPiso();
		this.fracao = entity.getFracao();
		this.imgUrl = entity.getImgUrl();
		this.date = entity.getDate();
		this.createdAt = entity.getCreatedAt();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLocalizacao() {
		return localizacao;
	}

	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}

	public String getTipologia() {
		return tipologia;
	}

	public void setTipologia(String tipologia) {
		this.tipologia = tipologia;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getUtilizacao() {
		return utilizacao;
	}

	public void setUtilizacao(String utilizacao) {
		this.utilizacao = utilizacao;
	}

	public String getArquitetura() {
		return arquitetura;
	}

	public void setArquitetura(String arquitetura) {
		this.arquitetura = arquitetura;
	}

	public Integer getPiso() {
		return piso;
	}

	public void setPiso(Integer piso) {
		this.piso = piso;
	}

	public String getFracao() {
		return fracao;
	}

	public void setFracao(String fracao) {
		this.fracao = fracao;
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

}
