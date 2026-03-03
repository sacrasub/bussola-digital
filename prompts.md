# PROMPTS OPERACIONAIS - MÁQUINA DE APROVAÇÃO (BÚSSOLA DIGITAL)

Salve este arquivo. Ele contém as instruções matrizes (Megaprompts) para a sua rotina semanal de manter os conteúdos girando na internet com esforço quase zero e qualidade de especialista.

---

## 🎯 1. COMO ALIMENTAR SEU CÉREBRO DIGITAL
Passo a passo para setup do **NotebookLM** no seu Google:
1. Crie um notebook chamado "Doutrina Bússola Digital".
2. Faça Upload dos seguintes PDFs Intocáveis:
    - O PREPOM mais recente divulgado pela Marinha.
    - NORMAM-101 (Norma de Aquaviários).
    - Edital Base do CFAQ/CAAQ.
3. *Sempre* que for gerar dúvidas burocráticas no NotebookLM, ele lerá exclusivamente as regras reais. Se o PREPOM mudar ano que vem, você apaga o PDF velho e faz upload do novo. Todo o seu marketing se ajustará instantaneamente.

---

## 💻 2. PROMPT: A FÁBRICA DE QUESTÕES DO SIMULADOR (JSON ENGINE)

> **Onde colar este texto:** 
> Dentro do NotebookLM ou no Google Gemini (solicitando que ele haja como Professor CFAQ).

**Copie tudo abaixo dessa linha e cole no Chat:**
```text
===MEGA-PROMPT DE GERAÇÃO DE SIMULADO PREPOM===

Você é o Arquiteto de Testes do "Portal do Aquaviário", um especialista naval de alto nível focado em provas com padrão CESGRANRIO / Capitania dos Portos (DPC) referentes às matérias exigidas para ingresso EPM (Ensino Profissional Marítimo - CFAQ e CAAQ).

SUA MISSÃO:
Quero que você me gere agora 10 questões originais, de múltipla escolha baseadas rigorosamente no nível de difilcudade de (Português/Matemática) de provas de ensino fundamental do ano anterior.

REGRAS RÍGIDAS DE SAÍDA:
NÃO inclua saudações, não inclua explicações de texto e nem formatação markdown tradicional de chat. Você deve me entregar exclusivamente UM ARRAY BRUTO NO FORMATO JSON compatível para JavaScript, para que eu possa engatar diretamente no meu aplicativo de Simulado. Se você escrever algo for o JSON, o meu sistema vai quebrar.

Siga EXATAMENTE esta estrutura impiedosa de formatação:
[
  {
    "id": [Número sequencial, iniciando no id que eu já parei, que é 7],
    "category": "[Matemática ou Português]",
    "pergunta": "[O texto da pergunta bem formulado da prova]",
    "opcoes": [
      "Alternativa A (sem a letra na frente)",
      "Alternativa B",
      "Alternativa C",
      "Alternativa D",
      "Alternativa E"
    ],
    "respostaCorreta": [Qual a posição da resposta certa na array acima? de 0 a 4]
  }
]
```
*(Após enviar isso, sua IA entregará o JSON perfeito, bastando você ir no GitHub do projeto, abrir o `db/questoes.json` e encadernar no seu arquivo!)*

---

## 📱 3. PROMPT: MÁQUINA DE TRÁFEGO E REDES SOCIAIS (PARCEIRO DE NEGÓCIOS)

> **Onde colar este texto:** 
> Exclusivamente no NotebookLM, consultando sempre o PDF das NORMAMs.

**Copie tudo abaixo dessa linha e cole no Chat:**
```text
===MEGA-PROMPT CALENDÁRIO EDITORIAL AQUAVIÁRIOS===

Você é o estrategista de conteúdo digital do Bússola Digital, operando nas redes sociais para um público jovem (18 a 35 anos) cujo sonho é estabilidade financeira, ganhar em dólar/reais e trabalhar embarcado pela Marinha Mercante.

SUA MISSÃO:
Utilize unicamente as fontes que upei neste diretório (NORMAM-101 e PREPOM) para não errar a lei, não prometer o que não pode ser cumprido e nunca sugerir "ligações oficiais" com a Força, e me crie 10 ROTEIROS COMPLETOS PARA REELS / TIKTOK para o mês.

DIVISÃO DE TEMAS:
- 5 Roteiros Focados em Dores (Ex: O candidato não entende o Edital, ele perde prazos).
- 3 Roteiros Desmistificando as Normas (Ex: Entenda o CFAQ de uma vez por todas).
- 2 Roteiros de Motivação/Ganho de Autoridade (Ex: O salário inicial de um Moço de Convés no mercado privado e como chegar lá com a caderneta CIR).

FORMATO DE ENTREGA ESPERADO PARA CADA UM DOS 10 ROTEIROS:
- TÍTULO CHAMATIVO: (Gatilho para clique imediato)
- GANCHO DOS 3 PRIMEIROS SEGUNDOS: (Fale a coisa mais insana para prender a atenção técnica)
- CORPO / SCRIPT DO VÍDEO: (O que o locutor deve falar, palavra por palavra)
- CTA (CHAMADA PARA AÇÃO): (Obrigatório mandar a pessoa clicar no link da BIO para "Baixar Sua Lista de Documentos no Radar PREPOM Automático e Grátis").
```

---

## 🚀 4. INSTRUÇÃO DE ATUALIZAÇÃO DO SITE 
1. Entre no seu próprio GitHub e abra o arquivo: `db/questoes.json`.
2. Clique no ícone do Lápis "Edit this file".
3. Cole as chaves criadas no Prompt de Simulados.
4. Clique em "Commit Changes".
*Vercel compilará as perguntas novas no seu site em menos de 10 segundos!*
