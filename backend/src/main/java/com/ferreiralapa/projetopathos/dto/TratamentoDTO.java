package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;

import com.ferreiralapa.projetopathos.entities.Tratamento;

public class TratamentoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String tipologia;
	private String procedimento;
	private String diagnostico;
	private String produto;
	private String imgUrl;

	public TratamentoDTO() {
		super();
	}

	public TratamentoDTO(Long id, String tipologia, String procedimento, String diagnostico, String produto,
			String imgUrl) {
		this.id = id;
		this.tipologia = tipologia;
		this.procedimento = procedimento;
		this.diagnostico = diagnostico;
		this.produto = produto;
		this.imgUrl = imgUrl;
	}

	public TratamentoDTO(Tratamento entity) {
		this.id = entity.getId();
		this.tipologia = entity.getTipologia();
		this.procedimento = entity.getProcedimento();
		this.diagnostico = entity.getDiagnostico();
		this.produto = entity.getProduto();
		this.imgUrl = entity.getImgUrl();
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

	public String getProduto() {
		return produto;
	}

	public void setProduto(String produto) {
		this.produto = produto;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

}
