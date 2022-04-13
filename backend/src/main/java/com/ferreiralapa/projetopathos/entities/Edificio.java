package com.ferreiralapa.projetopathos.entities;

import java.io.Serializable;
import java.util.Objects;

public class Edificio implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String localizacao;
	private String tipologia;
	private String nome;
	private String utilizacao;
	private String arquitetura;
	private Integer piso;
	private String fracao;

	public Edificio() {
	}

	public Edificio(Long id, String localizacao, String tipologia, String nome, String utilizacao, String arquitetura,
			Integer piso, String fracao) {
		super();
		this.id = id;
		this.localizacao = localizacao;
		this.tipologia = tipologia;
		this.nome = nome;
		this.utilizacao = utilizacao;
		this.arquitetura = arquitetura;
		this.piso = piso;
		this.fracao = fracao;
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

	public String getLocalizacao() {
		return localizacao;
	}

	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
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
		Edificio other = (Edificio) obj;
		return Objects.equals(id, other.id);
	}

}
