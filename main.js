var app = new Vue({
    el: '#app',
    data: {
    }
  })

// Define a saudação do e-mail baseado no período do dia
function saudacao(){
    var d = new Date();
    var horas = d.getHours();
    if     (horas < 12){ return "Bom dia" }
    else if(horas < 19){ return "Boa tarde" }
    else               { return "Boa noite" }
  }

  // Esconde o elemento informado
  function esconder(elemento){
    document.getElementById(elemento).style.display = "none";
  }

  // Mostra na tela o elemento informado
  function mostrar(elemento){
    document.getElementById(elemento).style.display = "block";
  }

  // Mostra o formulário escolhido e esconde os outros
  function escolher(){
    var escolha = document.getElementById("tipo").value;
    esconder("dns_form");
    esconder("firewall_form");
    esconder("res_diligencia_form");
    esconder("convite_github_form");
    esconder("resultado");
    mostrar(escolha + "_form");
  }

  function dns_gerar(){
    var cname = document.getElementById("cname").value.trim();
    var subdomain = document.getElementById("subdomain").value.trim();
    var hom = ",</li><li>\"hom-" + cname + "\" no subdomínio \"" + subdomain + "\"";
    var dev = ",</li><li>\"dev-" + cname + "\" no subdomínio \"" + subdomain + "\"";
    if(document.getElementById("hom").checked == false){ hom = ""; }
    if(document.getElementById("dev").checked == false){ dev = ""; }
    var dnsinterno = "<li>DNS interno = " + document.getElementById("dnsinterno").value.trim(); + "</li>";
    var dnsexterno = "<li>DNS externo = " + document.getElementById("dnsexterno").value.trim(); + "</li>";
    if(document.getElementById("dnsinterno").value == ""){ dnsinterno = ""; }
    if(document.getElementById("dnsexterno").value == ""){ dnsexterno = ""; }
    var assunto = "Solicitação de DNS - " + cname.toUpperCase();
    var corpo = "Prezada(o),"
	            + "<br><br>Favor alterar o CNAME:<ul>"
	            + "<li>\"" + cname + "\" no subdomínio \"" + subdomain + "\""
              + hom
              + dev
              + "</li></ul><br>Para apontar para:<ul>"
				      + dnsinterno
				      + dnsexterno
				      + "</ul><br>";
    email_gerar(assunto, corpo);
  }

  function firewall_gerar(){
    var origem = document.getElementById("origem").value.trim();;
    var destino = document.getElementById("destino").value.trim();;
    var porta = document.getElementById("porta").value.trim();;
    if(document.getElementById("icmp").checked){ porta_protocolo = "<li>Protocolo: ICMP</li>"; }
    var assunto = "Solicitação de Liberação no Firewall - " + origem.toUpperCase() + " > " + destino.toUpperCase();
    var corpo = "Prezada(o),"
	            + "<br><br>Solicito liberação de acesso:<ul>"
				      + "<li>Origem: " + origem + ";</li>"
              + "<li>Destino: " + destino + ";</li>"
              + "<li>Porta: " + porta + ".</li>";
				      + "</ul><br>";
    if(origem && destino){
      email_gerar(assunto, corpo);
    }
  }

  function res_diligencia_gerar(){
    var pronome = document.getElementById("pronome").value;
    var cargo = document.getElementById("cargo").value;
    var aprovacao = document.getElementById("aprovacao").value;
    var observacoes = document.getElementById("observacoes").value.trim();;
    var experiencia = "experiência na área técnica de TI ou correlatas"
    if(cargo == "gp"){ experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI" }
    if(cargo == "sm"){ experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com desenvolvimento ágil" }
    if(cargo == "uxui"){ experiencia  = "mais de 4 anos de experiência profissional na área técnica de TI" }
    if(cargo == "arq"){ experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com desenvolvimento ágil" }
    if(cargo == "prog_sr"){ experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com desenvolvimento ágil" }
    if(cargo == "prog_pl"){ experiencia  = "mais de 4 anos de experiência profissional na área técnica de TI" }
    if(cargo == "prog_jr"){ experiencia  = "mais de 2 anos de experiência profissional na área técnica de TI" }
    if(cargo == "infra_sr"){ experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com infraestrutura ágil" }
    if(cargo == "infra_pl"){ experiencia  = "mais de 4 anos de experiência profissional na área técnica de TI" }
    if(cargo == "dados_sr"){ experiencia  = "mais de 6 anos de experiência profissional com tecnologias de dados e bases de dados, sendo 2 anos com métodos ágeis" }
    if(cargo == "dados_pl"){ experiencia  = "mais de 4 anos de experiência profissional com tecnologias de dados e bases de dados" }
    var assunto = "RE: Diligência Prévia de Capacidade Técnica";
    var corpo = saudacao() + ","
              + "<br><br>O resultado da Diligência Prévia de Capacidade Técnica foi \"<b>" + aprovacao + "</b>\".<br><br>"
              + pronome.toUpperCase() + " funcionári" + pronome + " indicad" + pronome
              + " pela AMcom possui formação superior completa e " + experiencia
              + ".<br><br>Observações:<ul><li>"
              + observacoes
				      + "</li></ul><br>";
    if(pronome && cargo && aprovacao){
      email_gerar(assunto, corpo, "none");
    }
  }

  function convite_github_gerar() {
    var assunto = "RE: Acesso GitHub";
    var corpo = saudacao() + ","
              + "<br><br>Enviado o convite para contribuir na organização do GitHub."
              + "<br>Quando aceitar, favor, sinalizar para conceder os acessos."
              + "<br>";
    email_gerar(assunto, corpo, "none");
  }

  function email_gerar(assunto, corpo, cabecalho_display = "block"){
    document.getElementById("cabecalho").style.display = cabecalho_display;
    document.getElementById("assunto_email").innerHTML = assunto;
	  document.getElementById("corpo_email").innerHTML = corpo;
    document.getElementById("resultado").style.display = "block";
  }