package com.ferreiralapa.projetopathos.resources;

import java.io.IOException;
import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ferreiralapa.projetopathos.dto.AnomaliaDTO;
import com.ferreiralapa.projetopathos.services.AnomaliaService;

import requestModels.AddAnomaliaRequest;

@RestController
@RequestMapping(value = "/anomalias")
public class AnomaliaResource {

    @Autowired
    private AnomaliaService AnomaliaService;

    /*
     * @GetMapping public ResponseEntity<List<AnomaliaDTO>> findAll() {
     * List<AnomaliaDTO> list = AnomaliaService.findAll(); return
     * ResponseEntity.ok().body(list); }
     */

    @GetMapping
    public ResponseEntity<Page<AnomaliaDTO>> findAll(Pageable pageable) {
        Page<AnomaliaDTO> list = AnomaliaService.findAllPaged(pageable);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<AnomaliaDTO> findById(@PathVariable Long id) {
        AnomaliaDTO dto = AnomaliaService.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    // Rever tudo e provavelmente temos que mudar de postGres para mySql devido à questão das imagens!
    @PostMapping
    public ResponseEntity<AddAnomaliaRequest> insert(@Valid @ModelAttribute AddAnomaliaRequest request) throws IOException {
        request = AnomaliaService.insert(request); // perform the database insertion
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(request.getId()).toUri();
        return ResponseEntity.created(uri).body(request);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<AnomaliaDTO> update(@Valid @PathVariable Long id, @RequestBody AnomaliaDTO dto) {
        dto = AnomaliaService.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        AnomaliaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
