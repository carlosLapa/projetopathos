package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.ferreiralapa.projetopathos.entities.Anomalia;
import com.ferreiralapa.projetopathos.entities.Causa;

public class CausaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String tipologia;
	private String descricao;

	private List<AnomaliaDTO> anomalias = new ArrayList<>();

	public CausaDTO() {
	}

	public CausaDTO(Long id, String tipologia, String descricao) {
		this.id = id;
		this.tipologia = tipologia;
		this.descricao = descricao;
	}

	public CausaDTO(Causa entity) {
		this.id = entity.getId();
		this.tipologia = entity.getTipologia();
		this.descricao = entity.getDescricao();
	}

	public CausaDTO(Causa entity, Set<Anomalia> anomalias) {
		this(entity);
		anomalias.forEach(anom -> this.anomalias.add(new AnomaliaDTO(anom)));
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

	public List<AnomaliaDTO> getAnomalias() {
		return anomalias;
	}

	public void setAnomalias(List<AnomaliaDTO> anomalias) {
		this.anomalias = anomalias;
	}

}
