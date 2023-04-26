package requestModels;

import java.time.Instant;

import javax.validation.constraints.PastOrPresent;

import org.springframework.web.multipart.MultipartFile;

import com.ferreiralapa.projetopathos.entities.Anomalia;

public class AddAnomaliaRequest {

    private Long id;
    private String consequente;
    private String inconsequente;

    @PastOrPresent(message = "A data não pode ser futura")
    private Instant date;
    private String tipologia;
    private String descricao;
    private MultipartFile img;

    public AddAnomaliaRequest() {

    }

    public AddAnomaliaRequest(Long id, String consequente, String inconsequente, Instant date, String tipologia,
            String descricao,
            MultipartFile img) {
        super();
        this.id = id;
        this.consequente = consequente;
        this.inconsequente = inconsequente;
        this.date = date;
        this.tipologia = tipologia;
        this.descricao = descricao;
        this.img = img;
    }

    public AddAnomaliaRequest(Anomalia entity) {
        this.id = entity.getId();
        this.consequente = entity.getConsequente();
        this.inconsequente = entity.getInconsequente();
        this.date = entity.getDate();
        this.tipologia = entity.getTipologia();
        this.descricao = entity.getDescricao();
        this.img = entity.getImg();
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

    public MultipartFile getImg() {
        return img;
    }

    public void setImg(MultipartFile img) {
        this.img = img;
    }

}
