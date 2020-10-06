var app = new Vue({
    el: '#app',
    data: {
        opcoes: [
            {
                id: 1,
                nome: 'DNS'
            },
            {
                id: 2,
                nome: 'Firewall'
            },
            {
                id: 3,
                nome: 'Resultado de Diligência'
            },
            {
                id: 4,
                nome: 'Convite Github'
            }
        ],
        exibirDNS: false,
        exibirFirewall: false,
        exibirResultadoDiligencia: false,
        exibirConviteGitHub: false,
        modeloOpcaoSelecionada: '',
        modeloFormularioDNS: {
            cname: '',
            subdomain: 'sme.prefeitura.sp.gov.br',
            homologacaoChecado: true,
            desenvolvimentoChecado: true,
            DNSInterno: '10.50.1.189',
            DNSExterno: '186.239.235.118'
        },
        homologacao: '',
        desenvolvimento: '',
        DNSInterno: '',
        DNSExterno: '',
        modeloFormularioFirewall: {
            origem: '',
            destino: '',
            porta: '',
            ICMPChecado: false,
            portaProtocolo: ''
        },
        modeloEmail: {
            assunto: '',
            corpo: ''
        }
    },
    methods: {
        escolher: function() {
            this.exibir(this.modeloOpcaoSelecionada);
        },
        exibir: function(opcao) {
            this.exibirDNS = false;
            this.exibirFirewall = false;
            this.exibirResultadoDiligencia = false;
            this.exibirConviteGitHub = false;
            switch(opcao) {
                case 1:
                    this.exibirDNS = true;
                    break;
                case 2:
                    this.exibirFirewall = true;
                    break;
                case 3:
                    this.exibirResultadoDiligencia = true;
                    break;
                case 4:
                    this.exibirConviteGitHub = true;
                    break;
            }

        },
        dns_gerar: function () {
            this.homologacao = ",</li><li>\"hom-" + this.modeloFormularioDNS.cname.trim() + "\" no subdomínio \"" + this.modeloFormularioDNS.subdomain.trim() + "\"";
            this.desenvolvimento = ",</li><li>\"dev-" + this.modeloFormularioDNS.cname.trim() + "\" no subdomínio \"" + this.modeloFormularioDNS.subdomain.trim() + "\"";
            if(this.modeloFormularioDNS.homologacaoChecado == false){ this.homologacao = ""; }
            if(this.modeloFormularioDNS.desenvolvimentoChecado == false){ this.desenvolvimento = ""; }
            this.DNSInterno = "<li>DNS interno = " + this.modeloFormularioDNS.DNSInterno.trim() + "</li>";
            this.DNSExterno = "<li>DNS externo = " + this.modeloFormularioDNS.DNSExterno.trim() + "</li>";
            if(this.modeloFormularioDNS.DNSInterno == ""){ this.DNSInterno = ""; }
            if(this.modeloFormularioDNS.DNSExterno == ""){ this.DNSExterno = ""; }
            this.modeloEmail.assunto = "Solicitação de DNS - " + this.modeloFormularioDNS.cname.toUpperCase();
            this.modeloEmail.corpo = "Prezada(o),"
                        + "<br><br>Favor alterar o CNAME:<ul>"
                        + "<li>\"" + this.modeloFormularioDNS.cname.trim() + "\" no subdomínio \"" + this.modeloFormularioDNS.subdomain.trim() + "\""
                      + this.homologacao.trim()
                      + this.desenvolvimento.trim()
                      + "</li></ul><br>Para apontar para:<ul>"
                              + this.DNSInterno.trim()
                              + this.DNSExterno.trim()
                              + "</ul><br>";
            this.email_gerar(this.modeloEmail.assunto, this.modeloEmail.corpo);
        },
        firewall_gerar: function (){
            if(this.modeloFormularioFirewall.ICMPChecado){ this.modeloFormularioFirewall.portaProtocolo = "<li>Protocolo: ICMP</li>"; }
            this.modeloEmail.assunto = "Solicitação de Liberação no Firewall - " + this.modeloFormularioFirewall.origem.toUpperCase() + " > " + this.modeloFormularioFirewall.destino.toUpperCase();
            this.modeloEmail.corpo = "Prezada(o),"
                        + "<br><br>Solicito liberação de acesso:<ul>"
                              + "<li>Origem: " + this.modeloFormularioFirewall.origem.trim() + ";</li>"
                      + "<li>Destino: " + this.modeloFormularioFirewall.destino.trim() + ";</li>"
                      + "<li>Porta: " + this.modeloFormularioFirewall.portaProtocolo.trim() + ".</li>";
                              + "</ul><br>";
            if(this.modeloFormularioFirewall.origem && this.modeloFormularioFirewall.destino){
              this.email_gerar(this.modeloEmail.assunto, this.modeloEmail.corpo);
            }
        },
        res_diligencia_gerar: function () {
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
            var corpo = this.saudacao() + ","
                      + "<br><br>O resultado da Diligência Prévia de Capacidade Técnica foi \"<b>" + aprovacao + "</b>\".<br><br>"
                      + pronome.toUpperCase() + " funcionári" + pronome + " indicad" + pronome
                      + " pela AMcom possui formação superior completa e " + experiencia
                      + ".<br><br>Observações:<ul><li>"
                      + observacoes
                              + "</li></ul><br>";
            if(pronome && cargo && aprovacao){
              this.email_gerar(assunto, corpo, "none");
            }
        },
        convite_github_gerar: function () {
            var assunto = "RE: Acesso GitHub";
            var corpo = this.saudacao() + ","
                      + "<br><br>Enviado o convite para contribuir na organização do GitHub."
                      + "<br>Quando aceitar, favor, sinalizar para conceder os acessos."
                      + "<br>";
            this.email_gerar(assunto, corpo, "none");
        },
        email_gerar: function (assunto, corpo, cabecalho_display = "block") {
            document.getElementById("cabecalho").style.display = cabecalho_display;
            document.getElementById("assunto_email").innerHTML = assunto;
              document.getElementById("corpo_email").innerHTML = corpo;
            document.getElementById("resultado").style.display = "block";
        },
        // Define a saudação do e-mail baseado no período do dia
        saudacao: function () {
            var d = new Date();
            var horas = d.getHours();
            if     (horas < 12){ return "Bom dia" }
            else if(horas < 19){ return "Boa tarde" }
            else               { return "Boa noite" }
        }
    }
  })