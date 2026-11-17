# Massa Ponto
Primeira versão demonstrativa responsiva do controle de jornada para emissoras.

## Executar
- Node.js 22 recomendado.
- `npm install`
- `npm run dev`
- `npm test`
- `npm run build`

## Escopo
Perfil, alternância demonstrativa entre gestor e colaborador, captura de localização sob demanda, histórico, filtros, exportação CSV, impressão, solicitações de ajuste/abono e decisão do gestor. Dados persistem somente no navegador. Não há login verdadeiro, backend, isolamento de dados, notificação externa nem upload de documentos. A aprovação registra decisão, não aplica automaticamente alterações à jornada. O horário é do dispositivo e os cálculos de jornada são estimativas com escala fixa de exemplo, não folha oficial.

NÃO usar com trabalhadores reais: não é REP-P, não fornece AFD/AEJ nem comprovantes regulamentares. GPS é opcional e não é prova de presença. Não inserir dados pessoais; limpe os dados locais após testes. Não há serviço externo configurado. O manifesto é uma preparação de instalação mobile; suporte offline e instalação precisam ser validados.

Próxima etapa: autenticação, banco isolado por emissora, horário confiável, regras de jornada, tratamento auditável, armazenamento privado e integração regulamentar. Publicação somente após aprovação.
