import React, { useState } from 'react';
import {
  Zap,
  LayoutDashboard,
  MessageSquare,
  Clock,
  FileText,
  Settings,
  Search,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Target,
  Brain,
  Plus,
  ShieldCheck,
  TrendingUp,
  Users,
  ExternalLink,
  Key
} from 'lucide-react';

const INITIAL_CLIENTS = [
  {
    id: 'ml',
    initials: 'ML',
    name: 'Marina Lopes',
    niche: 'Fotografia & Casamentos',
    temperature: 'morno',
    scenario: 'Pediu preço a frio',
    message: 'Oii, tudo bem? Vi seu perfil pelo Instagram e amei as fotos!! Vou casar em março do ano que vem aqui em SP. Quanto custa a cobertura do casamento? Pode me mandar a tabela de valores? 😍',
    feeling: 'Veio pelo Explore, não é indicação. Parece estar cotando vários fotógrafos ao mesmo tempo.',
    analysis: {
      raioX: 'Ela está encantada, mas ainda no modo "pesquisa de mercado": abriu várias conversas e vai comparar tabelas lado a lado. Para ela, neste momento, fotógrafo é commodity — ganha quem parecer mais barato ou mais rápido.',
      armadilha: 'Mandar o PDF de preços agora. Sem contexto de valor, seu número vira só mais uma linha na planilha dela — e você perde o controle da conversa.',
      jogadaTitulo: 'Qualificação sem atrito',
      jogadaDesc: 'Acolher o entusiasmo, adiar o preço com elegância e fazer 1 pergunta que coloca ela para falar sobre o dia — e não sobre a tabela.',
      opcoes: [
        {
          label: 'Opção A — Acolhedora & Consultiva',
          mensagens: [
            'Oi Marina! Tudo ótimo por aqui, e parabéns pelo noivado! Março é uma época excelente para casar.',
            'Fico muito feliz que nossa estética tenha batido com o que você busca.',
            'Para eu te passar os valores certinhos para o formato do seu casamento: vocês vão fazer cerimônia e festa no mesmo local ou em espaços separados? Já têm o horário definido?'
          ]
        },
        {
          label: 'Opção B — Direta & Alto Status',
          mensagens: [
            'Olá Marina, tudo bem? Que notícia boa, parabéns pela fase!',
            'Como cada casamento tem uma dinâmica única de tempo e estrutura, eu não trabalho com tabela engessada.',
            'Me conta rapidinho: qual a data exata de março e onde vocês vão casar? Você já conhece um pouco de como funciona a nossa direção no dia?'
          ]
        }
      ],
      tabuleiro: 'Ela vai responder com os detalhes do casamento (local e horário). Assim que ela responder, você valida a escolha do local ("Excelente escolha de espaço"), explica em 2 linhas o seu diferencial de direção sem poses forçadas e pergunta se pode enviar a proposta personalizada.'
    }
  },
  {
    id: 'ra',
    initials: 'RA',
    name: 'Rafael Dias',
    niche: 'Imóveis de Alto Padrão',
    temperature: 'frio',
    scenario: 'Visualizou e sumiu (Vácuo)',
    message: 'Bom dia! Mandei as informações da casa no condomínio na terça-feira, ele visualizou o material completo mas não respondeu mais nada há 3 dias.',
    feeling: 'Empresário ocupado, direto ao ponto. Não gosta de vendedor insistente cobrando retorno.',
    analysis: {
      raioX: 'O silêncio dele não é falta de educação, é falta de prioridade ou alguma objeção específica na planta/valor que ele não quis parar para explicar no meio da correria.',
      armadilha: 'Mandar "Oi Rafael, conseguiu ver a proposta?" ou "Ficou alguma dúvida?". Isso soa como cobrança de vendedor carente e gera mais vácuo.',
      jogadaTitulo: 'Retomada de Autoridade & Permissão',
      jogadaDesc: 'Tirar a pressão do fechamento e provocar uma resposta curta investigando se o imóvel fez sentido para o momento dele.',
      opcoes: [
        {
          label: 'Opção A — Investigação Elegante',
          mensagens: [
            'Fala Rafael, boa tarde! Imagino a correria da semana por aí.',
            'Me diz uma coisa rápida só para eu alinhar meu radar aqui: aquela configuração da casa que te mandei bateu com o que você e sua família buscam hoje, ou sentiu que faltou algum detalhe específico na planta?'
          ]
        },
        {
          label: 'Opção B — Desapego Estratégico',
          mensagens: [
            'Oi Rafael, tudo bem?',
            'Estou organizando a agenda de visitas da próxima semana para aquela unidade do condomínio. Faz sentido deixarmos um horário pré-reservado para você conhecer pessoalmente ou prefere pausar essa busca por enquanto?'
          ]
        }
      ],
      tabuleiro: 'Por ser uma pergunta fechada e de alto nível, ele se sente seguro para dizer a verdade ("Gostei, mas achei o terreno pequeno" ou "Semana foi corrida, vamos ver no sábado"). A conversa destrava na hora.'
    }
  },
  {
    id: 'cf',
    initials: 'CF',
    name: 'Camila Fontes',
    niche: 'Fotografia & Casamentos',
    temperature: 'quente',
    scenario: 'Vou falar com meu esposo(a)',
    message: 'Amei a proposta e o seu atendimento! Vou só mostrar para o Pedro hoje à noite quando ele chegar do trabalho e qualquer coisa te aviso amanhã, tá bom?',
    feeling: 'Tivemos uma ótima conversa, ela gostou muito, mas o noivo ainda não participou de nada e só vai ver o preço seco.',
    analysis: {
      raioX: 'Ela está comprada emocionalmente, mas o noivo não participou da construção de valor. Quando ela chegar em casa e disser "Amor, o fotógrafo custa R$ X", o noivo vai olhar apenas o número e puxar o freio.',
      armadilha: 'Dizer "Perfeito, fico no aguardo! Muito obrigado!". Você entrega o destino da venda na mão de quem não conhece seu trabalho e perde a janela de contato.',
      jogadaTitulo: 'Gatilho da Permissão + Municiamento',
      jogadaDesc: 'Validar a decisão em conjunto, dar um argumento visual para o noivo e travar o dia/hora exato do próximo contato.',
      opcoes: [
        {
          label: 'Opção A — Gatilho da Permissão Clássico',
          mensagens: [
            'Perfeito, Camila! Muito boa a sua postura, essa é uma decisão importante para tomarem juntos mesmo.',
            'Como o Pedro não participou do nosso papo, mostra para ele principalmente aquela parte de como deixamos vocês à vontade sem precisar ficar posando horas.',
            'Posso te chamar aqui amanhã por volta das 14h para você me contar o que ele achou? Pode ser?'
          ]
        },
        {
          label: 'Opção B — Áudio/Resumo para o Noivo',
          mensagens: [
            'Excelente, Camila! Alinhar com o Pedro é fundamental.',
            'Para facilitar para você não ter que explicar tudo sozinha, quer que eu mande um vídeo de 40 segundos aqui mostrando um casamento real exatamente no estilo do de vocês para você dar play junto com ele hoje à noite?',
            'E já combinamos: te chamo amanhã à tarde para alinharmos o próximo passo, combinado?'
          ]
        }
      ],
      tabuleiro: 'Ela vai responder "Pode sim! Pode me chamar amanhã!". No dia seguinte você não está "cobrando", está apenas cumprindo um combinado autorizado por ela.'
    }
  },
  {
    id: 'er',
    initials: 'ER',
    name: 'Eduardo Ramos',
    niche: 'Arquitetura & Interiores',
    temperature: 'morno',
    scenario: 'Achou caro / Pediu desconto',
    message: 'Gostamos bastante da sua apresentação e do portfólio, mas o valor do projeto ficou acima do orçamento que tínhamos separado para essa etapa. Consegue chegar em R$ 8.000 à vista?',
    feeling: 'Cliente tem poder aquisitivo, mas está testando margem como faz em qualquer negociação comercial.',
    analysis: {
      raioX: 'Ele já decidiu que quer você (tanto que fez uma contraproposta de fechamento à vista). Ele só precisa sentir que ganhou alguma vantagem comercial ou ajuste de escopo sem que você pareça desesperado.',
      armadilha: 'Dar o desconto direto na lata ("Fechado, faço por 8 mil!"). Se você baixa o preço sem tirar nada do escopo, ele sente que o seu preço original era inflado e perde o respeito pela sua autoridade.',
      jogadaTitulo: 'Ancoragem de Escopo & Contraproposta',
      jogadaDesc: 'Manter a integridade do seu valor, ajustar uma variável de entrega ou condição de pagamento e fechar o acordo com postura de par.',
      opcoes: [
        {
          label: 'Opção A — Ajuste de Condição com Autoridade',
          mensagens: [
            'Eduardo, excelente saber que o projeto bateu exatamente com o que vocês buscam.',
            'Pelo nível de detalhamento executivo que incluí para evitar dor de cabeça na obra de vocês, eu não consigo reduzir a entrega para R$ 8.000 mantendo o escopo completo.',
            'O que consigo fazer para viabilizar nossa parceria hoje no pagamento à vista é fecharmos em R$ 9.200, já deixando a primeira reunião de briefing agendada para terça-feira. Faz sentido para você?'
          ]
        },
        {
          label: 'Opção B — Redução Estratégica de Escopo',
          mensagens: [
            'Ótima colocação, Eduardo. Quero muito assinar esse projeto de vocês.',
            'Para chegarmos exatamente no teto de R$ 8.000 à vista sem comprometer a qualidade técnica do projeto, nós podemos ajustar o pacote para 2 rodadas de revisão de render em vez de 4.',
            'Dessa forma cabemos na sua meta financeira mantendo o padrão do escritório. Podemos seguir assim?'
          ]
        }
      ],
      tabuleiro: 'Ele percebe que o seu preço tem lastro real. Na maioria dos casos, o cliente de alto padrão prefere pagar a diferença para não perder itens do escopo ou fecha imediatamente na condição intermediária.'
    }
  }
];

const VACUO_LIST = [
  { id: 1, nome: 'Juliana & Marcos', nicho: 'Casamento Civil + Festa', tempo: '52 horas em silêncio', valor: 'R$ 7.500', etapa: 'Proposta enviada' },
  { id: 2, nome: 'Dr. Henrique Silva', nicho: 'Retratos Corporativos', tempo: '3 dias em silêncio', valor: 'R$ 2.800', etapa: 'Pediu preço a frio' },
  { id: 3, nome: 'Fernanda Costa', nicho: 'Ensaio Gestante Fine Art', tempo: '4 dias em silêncio', valor: 'R$ 1.900', etapa: 'Vou falar com meu esposo' },
];

const PROPOSTAS_LIST = [
  { id: 1, cliente: 'Marina Lopes & Lucas', valor: 'R$ 8.900', status: 'Visualizada há 12 min', tempoLeitura: '4 min 35s na página', quente: true },
  { id: 2, cliente: 'Camila Fontes & Pedro', valor: 'R$ 6.400', status: 'Visualizada ontem às 21:40', tempoLeitura: '6 min 12s na página', quente: true },
  { id: 3, cliente: 'Construtora Horizonte', valor: 'R$ 14.500', status: 'Aguardando abertura', tempoLeitura: '—', quente: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('destravador');
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState('ml');

  const currentClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const [niche, setNiche] = useState(currentClient.niche);
  const [scenario, setScenario] = useState(currentClient.scenario);
  const [message, setMessage] = useState(currentClient.message);
  const [feeling, setFeeling] = useState(currentClient.feeling);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [userApiKey, setUserApiKey] = useState('');

  const handleSelectClient = (client) => {
    setSelectedClientId(client.id);
    setNiche(client.niche);
    setScenario(client.scenario);
    setMessage(client.message);
    setFeeling(client.feeling);
    setActiveTab('destravador');
  };

  const handleNewNegotiation = () => {
    const newId = 'novo-' + Date.now();
    const newClient = {
      id: newId,
      initials: 'NV',
      name: 'Novo Cliente',
      niche: 'Fotografia & Casamentos',
      temperature: 'morno',
      scenario: 'Pediu preço a frio',
      message: '',
      feeling: '',
      analysis: currentClient.analysis
    };
    setClients([newClient, ...clients]);
    handleSelectClient(newClient);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    setIsAnalyzing(true);

    try {
      if (userApiKey.trim()) {
        const systemInstruction = `Você é o Estrategista Comercial Nível 20 (Método Bispo). Analise a conversa de WhatsApp e retorne ESTRITAMENTE um JSON válido com as chaves:
{
  "temperature": "frio" | "morno" | "quente",
  "raioX": "string explicando a psicologia oculta do cliente",
  "armadilha": "string explicando o que NÃO fazer agora",
  "jogadaTitulo": "string curta com o nome da tática",
  "jogadaDesc": "string explicando o movimento tático",
  "opcoes": [
    { "label": "Opção A — Consultiva & Elegante", "mensagens": ["balão 1", "balão 2"] },
    { "label": "Opção B — Direta & Alto Status", "mensagens": ["balão 1", "balão 2"] }
  ],
  "tabuleiro": "string prevendo o próximo passo"
}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userApiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${systemInstruction}\n\nNicho: ${niche}\nCenário: ${scenario}\nMensagem do cliente: ${message}\nFeeling de bastidor: ${feeling}`
                }]
              }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          setClients((prev) =>
            prev.map((c) =>
              c.id === selectedClientId
                ? {
                    ...c,
                    niche,
                    scenario,
                    message,
                    feeling,
                    temperature: parsed.temperature || 'morno',
                    analysis: parsed
                  }
                : c
            )
          );
          setIsAnalyzing(false);
          return;
        }
      }

      setTimeout(() => {
        const lowerMsg = message.toLowerCase();
        let customAnalysis = { ...currentClient.analysis };
        let temp = 'morno';

        if (lowerMsg.includes('valor') || lowerMsg.includes('preço') || lowerMsg.includes('orçamento') || scenario === 'Pediu preço a frio') {
          temp = 'morno';
          customAnalysis = {
            raioX: `Neste nicho de ${niche}, o cliente abriu a conversa focado apenas em preço porque ainda não enxergou a diferença entre o seu método e os concorrentes comuns.`,
            armadilha: 'Enviar PDF ou jogar o valor solto agora. Sem antes entender o contexto dele, ele vai usar o seu preço apenas para balizar o mercado e sumir.',
            jogadaTitulo: 'Qualificação Consultiva Nível 20',
            jogadaDesc: 'Acolher com segurança, demonstrar interesse genuíno pelo projeto/evento e fazer 2 perguntas estratégicas antes de abrir números.',
            opcoes: [
              {
                label: 'Opção A — Acolhedora & Qualificadora',
                mensagens: [
                  'Olá! Tudo ótimo por aqui, que bom receber seu contato!',
                  'Para eu te indicar a proposta exata para o que você precisa (sem te mandar um catálogo genérico): qual a data e o local que vocês estão planejando?',
                  'Me conta também: como você chegou até o nosso trabalho?'
                ]
              },
              {
                label: 'Opção B — Postura de Especialista',
                mensagens: [
                  'Oi, tudo bem? Prazer falar com você!',
                  'Cada projeto que assumimos aqui é desenhado sob medida para a dinâmica do cliente. Você já conhece como funciona o nosso método de trabalho ou é a primeira vez que vê nosso portfólio?',
                  'Me diz a data e cidade previstas que já checo nossa disponibilidade aqui na agenda!'
                ]
              }
            ],
            tabuleiro: 'Assim que o cliente responder data e local, você valida a escolha dele ("Excelente local/época!"), apresenta 1 diferencial forte do seu trabalho e agenda ou envia a proposta personalizada.'
          };
        } else if (lowerMsg.includes('esposo') || lowerMsg.includes('noivo') || lowerMsg.includes('pensar') || scenario === 'Vou falar com meu esposo(a)') {
          temp = 'quente';
          customAnalysis = {
            raioX: 'A cliente gostou da proposta, mas não decide sozinha. Se ela for conversar com o parceiro sem munição de valor, a conversa em casa vai girar 100% em torno de planilha financeira.',
            armadilha: 'Responder "Tudo bem, qualquer coisa me avisa! Obrigado!". Você perde o comando da venda e fica refém da sorte.',
            jogadaTitulo: 'Gatilho da Permissão Ativo',
            jogadaDesc: 'Validar a decisão em casal e pedir permissão explícita para retomar o contato em um dia e horário combinados.',
            opcoes: [
              {
                label: 'Opção A — Permissão com Dia Marcado',
                mensagens: [
                  'Ótima decisão! Alinhar todos os detalhes juntos traz muito mais segurança para vocês.',
                  'Posso te chamar aqui na quinta-feira à tarde para você me dizer o que vocês acharam? Pode ser?'
                ]
              },
              {
                label: 'Opção B — Investigação de Objeção Oculta',
                mensagens: [
                  'Perfeito, super entendo a importância de alinharem isso juntos!',
                  'Me diz só uma coisa para eu te ajudar nessa conversa com ele: pelo que você viu até aqui, a proposta fez total sentido para você ou ficou alguma dúvida em relação aos valores ou entregas?'
                ]
              }
            ],
            tabuleiro: 'O cliente concorda com o dia do retorno ("Pode sim!"). Quando chegar o dia combinado, você entra em contato com autoridade de quem está cumprindo um acordo.'
          };
        }

        setClients((prev) =>
          prev.map((c) =>
            c.id === selectedClientId
              ? { ...c, niche, scenario, message, feeling, temperature: temp, analysis: customAnalysis }
              : c
          )
        );
        setIsAnalyzing(false);
      }, 900);
    } catch (e) {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080E16] text-white flex font-sans antialiased selection:bg-[#10B981] selection:text-[#080E16]">
      <aside className="w-64 bg-[#0B131E] border-r border-[#1E2D40] flex flex-col justify-between shrink-0">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg shadow-[#10B981]/20">
              <Sparkles className="w-5 h-5 text-[#080E16]" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block leading-none">Nível 20</span>
              <span className="text-[11px] text-[#10B981] font-medium tracking-wider uppercase">Método Bispo</span>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="w-4 h-4 text-[#8C9BAE] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar negociação..."
              className="w-full bg-[#101926] border border-[#1E2D40] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#8C9BAE] focus:outline-none focus:border-[#10B981]"
            />
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8C9BAE] mb-2 px-2">
            Menu Principal
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#10B981]/15 text-[#10B981] border-l-2 border-[#10B981]'
                  : 'text-[#8C9BAE] hover:text-white hover:bg-[#101926]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('destravador')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'destravador'
                  ? 'bg-[#10B981]/15 text-[#10B981] border-l-2 border-[#10B981]'
                  : 'text-[#8C9BAE] hover:text-white hover:bg-[#101926]'
              }`}
            >
              <Zap className="w-4 h-4" />
              Destravador IA
            </button>

            <button
              onClick={() => setActiveTab('vacuo')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'vacuo'
                  ? 'bg-[#10B981]/15 text-[#10B981] border-l-2 border-[#10B981]'
                  : 'text-[#8C9BAE] hover:text-white hover:bg-[#101926]'
              }`}
            >
              <span className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                Radar de Vácuo
              </span>
              <span className="bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full">
                3
              </span>
            </button>

            <button
              onClick={() => setActiveTab('propostas')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'propostas'
                  ? 'bg-[#10B981]/15 text-[#10B981] border-l-2 border-[#10B981]'
                  : 'text-[#8C9BAE] hover:text-white hover:bg-[#101926]'
              }`}
            >
              <FileText className="w-4 h-4" />
              Propostas Vivas
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'config'
                  ? 'bg-[#10B981]/15 text-[#10B981] border-l-2 border-[#10B981]'
                  : 'text-[#8C9BAE] hover:text-white hover:bg-[#101926]'
              }`}
            >
              <Settings className="w-4 h-4" />
              Configurações & API
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-[#1E2D40] flex items-center gap-3 bg-[#091019]">
          <div className="w-9 h-9 rounded-full bg-[#101926] border border-[#10B981] flex items-center justify-center text-xs font-bold text-[#10B981]">
            TB
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">Thiago Bispo</div>
            <div className="text-[11px] text-[#8C9BAE] truncate">Plano Private • Nível 20</div>
          </div>
        </div>
      </aside>

      {activeTab === 'destravador' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-[400px] border-r border-[#1E2D40] bg-[#0B131E]/60 p-6 overflow-y-auto flex flex-col gap-5 shrink-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white">Negociações Ativas</span>
                <span className="bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {clients.length}
                </span>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {clients.map((client) => {
                  const isSelected = client.id === selectedClientId;
                  return (
                    <button
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="flex flex-col items-center gap-1.5 group cursor-pointer shrink-0"
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#10B981]/20 text-white ring-2 ring-[#10B981] shadow-lg shadow-[#10B981]/20'
                            : 'bg-[#101926] text-[#8C9BAE] border border-[#1E2D40] group-hover:border-[#10B981]/50 group-hover:text-white'
                        }`}
                      >
                        {client.initials}
                      </div>
                      <span
                        className={`text-[11px] ${
                          isSelected ? 'text-white font-semibold' : 'text-[#8C9BAE]'
                        }`}
                      >
                        {client.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
                <button
                  onClick={handleNewNegotiation}
                  title="Nova Negociação"
                  className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <div className="w-11 h-11 rounded-full bg-[#101926] border border-dashed border-[#1E2D40] hover:border-[#10B981] flex items-center justify-center text-[#8C9BAE] hover:text-[#10B981] transition-all">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] text-[#8C9BAE]">Novo</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#8C9BAE] mb-1.5">
                Nicho do Profissional
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-[#101926] border border-[#1E2D40] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10B981]"
              >
                <option>Fotografia & Casamentos</option>
                <option>Arquitetura & Interiores</option>
                <option>Imóveis de Alto Padrão</option>
                <option>Clínicas & Estética</option>
                <option>Consultoria & Infoprodutos</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#8C9BAE] mb-2">
                Cenário da Conversa
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Pediu preço a frio',
                  'Visualizou e sumiu (Vácuo)',
                  'Achou caro / Pediu desconto',
                  'Vou falar com meu esposo(a)',
                  'Análise livre'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setScenario(item)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                      scenario === item
                        ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]'
                        : 'bg-[#101926] text-[#8C9BAE] border border-[#1E2D40] hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-medium text-[#8C9BAE]">
                  Conversa do cliente (WhatsApp)
                </label>
                <span className="text-[10px] text-[#8C9BAE]">{message.length}/2000</span>
              </div>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cole aqui a mensagem que o cliente mandou..."
                className="w-full bg-[#101926] border border-[#1E2D40] rounded-xl p-3 text-xs text-white placeholder-[#8C9BAE] leading-relaxed focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-medium text-[#8C9BAE] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  Feeling de bastidor
                </label>
                <span className="text-[10px] text-[#8C9BAE]">Opcional</span>
              </div>
              <input
                type="text"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Ex: Veio por indicação, parece com pressa, já fez ensaio..."
                className="w-full bg-[#101926] border border-[#1E2D40] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#8C9BAE] focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] text-[#080E16] font-bold text-xs shadow-lg shadow-[#10B981]/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              {isAnalyzing ? 'Analisando Psicologia Nível 20...' : 'Destravar Negociação'}
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1E2D40]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#101926] border border-[#10B981] flex items-center justify-center font-bold text-xs text-[#10B981]">
                  {currentClient.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="font-bold text-base text-white">{currentClient.name}</h2>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        currentClient.temperature === 'quente'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : currentClient.temperature === 'morno'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          : 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                      }`}
                    >
                      ● Lead {currentClient.temperature}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C9BAE]">
                    {niche} • {scenario}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNewNegotiation}
                className="px-3.5 py-2 rounded-lg bg-[#101926] border border-[#1E2D40] hover:border-[#10B981] text-xs font-medium text-white flex items-center gap-2 cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#10B981]" />
                Nova jogada
              </button>
            </div>

            {isAnalyzing ? (
              <div className="p-12 rounded-2xl bg-[#101926] border border-[#1E2D40] flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#10B981] border-t-transparent animate-spin" />
                <div className="text-sm font-semibold text-white">
                  Traçando Engenharia da Jogada (Método Bispo)...
                </div>
                <p className="text-xs text-[#8C9BAE] max-w-md">
                  Calibrando leitura comportamental, removendo clichês e estruturando balões curtos para WhatsApp.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Brain className="w-4 h-4 text-[#10B981]" />
                    Raio-X Comportamental
                  </div>
                  <p className="text-xs text-[#D1D9E6] leading-relaxed">
                    {currentClient.analysis.raioX}
                  </p>
                  <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />A armadilha mortal
                    </div>
                    <p className="text-xs text-red-200/90 leading-relaxed">
                      {currentClient.analysis.armadilha}
                    </p>
                  </div>
                </div>

                <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
                    <Target className="w-4 h-4 text-[#10B981]" />
                    Engenharia da Jogada
                  </div>
                  <div className="text-base font-bold text-[#10B981] mb-1">
                    {currentClient.analysis.jogadaTitulo}
                  </div>
                  <p className="text-xs text-[#8C9BAE] leading-relaxed">
                    {currentClient.analysis.jogadaDesc}
                  </p>
                </div>

                <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <MessageSquare className="w-4 h-4 text-[#10B981]" />
                      Roteiro Pronto (Copy Nível 20)
                    </div>
                    <span className="text-[11px] text-[#8C9BAE]">Smart Casual • Zero Clichê</span>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="max-w-lg bg-[#182436] border border-[#25354D] rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-white leading-relaxed">
                      {message || 'Mensagem do cliente aparecerá aqui...'}
                      <div className="text-[10px] text-[#8C9BAE] text-right mt-1">14:32</div>
                    </div>
                    <span className="text-[10px] text-[#8C9BAE] mt-1 ml-1">
                      {currentClient.name.split(' ')[0]}
                    </span>
                  </div>

                  <div className="space-y-6 pt-2">
                    {currentClient.analysis.opcoes.map((opcao, idx) => {
                      const fullText = opcao.mensagens.join('\n\n');
                      const isCopied = copiedIndex === idx;
                      return (
                        <div key={idx} className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30">
                              {opcao.label}
                            </span>
                            <button
                              onClick={() => handleCopy(fullText, idx)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182436] hover:bg-[#10B981] text-white hover:text-[#080E16] text-[11px] font-semibold transition-all cursor-pointer"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  Copiado para o WhatsApp!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  Copiar sequência
                                </>
                              )}
                            </button>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            {opcao.mensagens.map((balao, bIdx) => (
                              <div
                                key={bIdx}
                                className="max-w-lg bg-gradient-to-br from-[#10B981] to-[#059669] text-[#06120E] font-medium rounded-2xl rounded-tr-sm px-4 py-3 text-xs leading-relaxed shadow-md"
                              >
                                {balao}
                                <div className="text-[10px] text-[#06120E]/70 text-right mt-1 font-semibold">
                                  14:35 ✓✓
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    Visão de Tabuleiro (Próximo Movimento)
                  </div>
                  <p className="text-xs text-[#D1D9E6] leading-relaxed">
                    {currentClient.analysis.tabuleiro}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'vacuo' && (
        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white">Radar de Vácuo (+48h sem resposta)</h1>
            <p className="text-xs text-[#8C9BAE] mt-1">
              Recupere negociações paradas sem parecer um vendedor chato cobrando retorno.
            </p>
          </div>

          <div className="grid gap-4">
            {VACUO_LIST.map((item) => (
              <div
                key={item.id}
                className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-white">{item.nome}</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {item.tempo}
                    </span>
                  </div>
                  <div className="text-xs text-[#8C9BAE]">
                    {item.niche} • Etapa: <strong className="text-white">{item.etapa}</strong> • Valor:{' '}
                    <strong className="text-[#10B981]">{item.valor}</strong>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectClient(clients[1])}
                  className="px-4 py-2.5 rounded-xl bg-[#10B981] text-[#080E16] font-bold text-xs hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  Gerar Resgate Nível 20
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white">Performance Comercial Nível 20</h1>
            <p className="text-xs text-[#8C9BAE] mt-1">
              Acompanhamento de conversões, velocidade de qualificação e dinheiro recuperado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5">
              <div className="flex items-center justify-between text-[#8C9BAE] text-xs mb-2">
                <span>Em Negociação Ativa</span>
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
              </div>
              <div className="text-2xl font-bold text-white">R$ 34.200</div>
              <div className="text-[11px] text-[#10B981] mt-1">+28% vs mês anterior</div>
            </div>

            <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5">
              <div className="flex items-center justify-between text-[#8C9BAE] text-xs mb-2">
                <span>Vendas Salvas do Vácuo</span>
                <Zap className="w-4 h-4 text-[#10B981]" />
              </div>
              <div className="text-2xl font-bold text-white">6 Contratos</div>
              <div className="text-[11px] text-[#8C9BAE] mt-1">R$ 21.800 recuperados com Gatilho da Permissão</div>
            </div>

            <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5">
              <div className="flex items-center justify-between text-[#8C9BAE] text-xs mb-2">
                <span>Taxa de Qualificação</span>
                <Users className="w-4 h-4 text-[#10B981]" />
              </div>
              <div className="text-2xl font-bold text-white">74%</div>
              <div className="text-[11px] text-[#10B981] mt-1">Leads que respondem antes do preço</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'propostas' && (
        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Propostas Vivas (Anti-PDF)</h1>
              <p className="text-xs text-[#8C9BAE] mt-1">
                Saiba o minuto exato em que o cliente abriu sua proposta e quanto tempo ficou na tela.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {PROPOSTAS_LIST.map((p) => (
              <div
                key={p.id}
                className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-white">{p.cliente}</span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                        p.quente
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-[#182436] text-[#8C9BAE]'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#8C9BAE] mt-1">
                    Valor: <strong className="text-white">{p.valor}</strong> • Tempo de leitura:{' '}
                    <strong className="text-[#10B981]">{p.tempoLeitura}</strong>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`https://proposta.nivel20.app/${p.id}`, `prop-${p.id}`)}
                  className="px-3.5 py-2 rounded-lg bg-[#182436] hover:bg-[#10B981] text-white hover:text-[#080E16] text-xs font-semibold transition-all cursor-pointer flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {copiedIndex === `prop-${p.id}` ? 'Link Copiado!' : 'Copiar Link da Proposta'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="flex-1 p-8 overflow-y-auto max-w-2xl space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white">Configurações & Chave de IA Gratuita</h1>
            <p className="text-xs text-[#8C9BAE] mt-1">
              O sistema já funciona imediatamente no modo Inteligência Nativa Nível 20. Se quiser conectar sua própria chave gratuita do Google AI Studio (Gemini), cole abaixo:
            </p>
          </div>

          <div className="bg-[#101926] border border-[#1E2D40] rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-[#10B981]" />
                Google Gemini API Key (Opcional - 100% Gratuito no Google AI Studio)
              </label>
              <input
                type="password"
                value={userApiKey}
                onChange={(e) => setUserApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#080E16] border border-[#1E2D40] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
              <p className="text-[11px] text-[#8C9BAE] mt-2">
                Com essa chave preenchida, o botão "Destravar Negociação" consulta a API oficial do Gemini 2.5 Flash em tempo real sem nenhum custo da Vercel.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
