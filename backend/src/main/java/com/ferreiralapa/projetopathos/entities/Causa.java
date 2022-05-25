package com.ferreiralapa.projetopathos.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_causa")
public class Causa implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String tipologia;

	@Column(columnDefinition = "TEXT")
	private String descricao;
	
	@ManyToMany
	@JoinTable(name = "tb_causa_anomalia", 
		joinColumns = @JoinColumn(name = "causa_id"),
		inverseJoinColumns = @JoinColumn(name = "anomalia_id"))
	Set<Anomalia> anomalias = new HashSet<>();

	public Causa() {
	}

	public Causa(Long id, String tipologia, String descricao) {
		this.id = id;
		this.tipologia = tipologia;
		this.descricao = descricao;
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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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
		Causa other = (Causa) obj;
		return Objects.equals(id, other.id);
	}

}
