package com.ferreiralapa.projetopathos.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_tratamento")
public class Tratamento implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String tipologia;
	private String procedimento;
	private String diagnostico;
	private String produto;
	private String imgUrl;

	@ManyToOne
	@JoinColumn(name = "patologia_id")
	private Patologia patologia;

	public Tratamento() {
	}

	public Tratamento(Long id, String tipologia, String procedimento, String diagnostico, String produto,
			String imgUrl) {
		super();
		this.id = id;
		this.tipologia = tipologia;
		this.procedimento = procedimento;
		this.diagnostico = diagnostico;
		this.produto = produto;
		this.imgUrl = imgUrl;
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

	public String getProcedimento() {
		return procedimento;
	}

	public void setProcedimento(String procedimento) {
		this.procedimento = procedimento;
	}

	public String getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(String diagnostico) {
		this.diagnostico = diagnostico;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getProduto() {
		return produto;
	}

	public void setProduto(String produto) {
		this.produto = produto;
	}

	public Patologia getPatologia() {
		return patologia;
	}

	public void setPatologia(Patologia patologia) {
		this.patologia = patologia;
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
		Tratamento other = (Tratamento) obj;
		return Objects.equals(id, other.id);
	}

}
