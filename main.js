var app = new Vue({
    el: '#app',
    data: {
        selecaoModeloEmail: [
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
        selecaoGenero: [
            {
                id: 'a',
                nome: 'Feminino'
            },
            {
                id: 'o',
                nome: 'Masculino'
            }
        ],
        selecaoCargo: [
            {
                id: 'gp',
                nome: 'Gerente de Projetos'
            },
            {
                id: 'sm',
                nome: 'Scrum Master'
            },
            {
                id: 'arq',
                nome: 'Arquitetura (sênior)'
            },
            {
                id: 'uxui',
                nome: 'Designer UX/UI (pleno)'
            },
            {
                id: 'prog_sr',
                nome: 'Analista/Programador Sênior'
            },
            {
                id: 'prog_pl',
                nome: 'Analista/Programador Pleno'
            },
            {
                id: 'prog_jr',
                nome: 'Analista/Programador Júnior'
            },
            {
                id: 'infra_sr',
                nome: 'Infra Ágil Sênior'
            },
            {
                id: 'infra_pl',
                nome: 'Infra Ágil Pleno'
            },
            {
                id: 'dados_sr',
                nome: 'Analista de Dados Sênior'
            },
            {
                id: 'dados_pl',
                nome: 'Analista de Dados Pleno'
            }
        ],
        selecaoResultado: [
            {
                id: 'satisfatório',
                nome: 'Satisfatório'
            },
            {
                id: 'não satisfatório',
                nome: 'Não satisfatório'
            }
        ],
        modeloFormularioResultadoDiligencia: {
            genero: '',
            perfil: '',
            experiencia: '',
            resultado: '',
            observacao: 'A DPC não dispensa da apresentação dos documentos comprobatórios.'
        },
        modeloEmail: {
            assunto: '',
            corpo: ''
        },
        emailSuporte: 'suporte@sme.prefeitura.sp.gov.br',
        emailInfraestruturaCentralIT: 'infraestrutura.smesp@centralit.com.br',
        emailDISIS: 'idscotic@sme.prefeitura.sp.gov.br'
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
        firewall_gerar: function () {
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
            this.modeloFormularioResultadoDiligencia.experiencia = "experiência na área técnica de TI ou correlatas"
            if(this.modeloFormularioResultadoDiligencia.cargo == "gp"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "sm"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com desenvolvimento ágil" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "uxui"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 4 anos de experiência profissional na área técnica de TI" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "arq"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com desenvolvimento ágil" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "prog_sr"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com desenvolvimento ágil" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "prog_pl"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 4 anos de experiência profissional na área técnica de TI" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "prog_jr"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 2 anos de experiência profissional na área técnica de TI" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "infra_sr"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 6 anos de experiência profissional na área técnica de TI, sendo 2 anos com infraestrutura ágil" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "infra_pl"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 4 anos de experiência profissional na área técnica de TI" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "dados_sr"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 6 anos de experiência profissional com tecnologias de dados e bases de dados, sendo 2 anos com métodos ágeis" }
            if(this.modeloFormularioResultadoDiligencia.cargo == "dados_pl"){ this.modeloFormularioResultadoDiligencia.experiencia  = "mais de 4 anos de experiência profissional com tecnologias de dados e bases de dados" }
            this.modeloEmail.assunto = "RE: Diligência Prévia de Capacidade Técnica";
            this.modeloEmail.corpo = this.saudacao() + ","
                      + "<br><br>O resultado da Diligência Prévia de Capacidade Técnica foi \"<b>" + this.modeloFormularioResultadoDiligencia.resultado + "</b>\".<br><br>"
                      + this.modeloFormularioResultadoDiligencia.genero.toUpperCase() + " funcionári" + this.modeloFormularioResultadoDiligencia.genero + " indicad" + this.modeloFormularioResultadoDiligencia.genero
                      + " pela AMcom possui formação superior completa e " + this.modeloFormularioResultadoDiligencia.experiencia
                      + ".<br><br>Observações:<ul><li>"
                      + this.modeloFormularioResultadoDiligencia.observacao
                              + "</li></ul><br>";
            if(this.modeloFormularioResultadoDiligencia.genero && this.modeloFormularioResultadoDiligencia.cargo && this.modeloFormularioResultadoDiligencia.resultado){
              this.email_gerar(this.modeloEmail.assunto, this.modeloEmail.corpo, "none");
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