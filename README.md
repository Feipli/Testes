# Human Head 3D (React Three Fiber)

Componente React que exibe um modelo GLB de cabeça humana com animações leves, otimizações de performance e fallback para dispositivos móveis.

## Requisitos atendidos

- Rotação aleatória contínua nos três eixos
- Movimento suave de flutuação (senoidal no eixo Y)
- Limite de FPS em 30 (`frameloop="demand"` + `invalidate` periódico)
- Pausa automática quando a aba está em segundo plano (`visibilitychange` + `frameloop="never"`)
- Carregamento lazy do canvas 3D (`React.lazy`)
- Descompressão Draco via `@react-three/drei` (`useGLTF(url, true)`)
- Fallback PNG em dispositivos móveis

## Uso

```tsx
import { HumanHead3D, preloadHumanHeadModel } from './components/HumanHead3D'

const GLB_URL = '/models/head.glb'
const FALLBACK_URL = '/images/head-fallback.png'

// Opcional: pré-carregar o modelo em desktop
preloadHumanHeadModel(GLB_URL)

<HumanHead3D
  glbUrl={GLB_URL}
  fallbackImageUrl={FALLBACK_URL}
  fallbackAlt="Retrato ilustrado"
  floatAmplitude={0.08}
  floatSpeed={1.2}
/>
```

## Assets

Coloque os arquivos em `public/`:

| Arquivo | Descrição |
|---------|-----------|
| `public/models/head.glb` | Modelo 3D comprimido com [Draco](https://google.github.io/draco/) |
| `public/images/head-fallback.png` | Imagem estática para mobile e loading |

## Desenvolvimento

```bash
npm install
npm run dev
```

## Estrutura

```
src/components/HumanHead3D/
├── HumanHead3D.tsx      # Wrapper com detecção mobile + lazy load
├── HumanHeadCanvas.tsx  # Canvas R3F, FPS 30, pausa em background
├── HumanHeadModel.tsx   # GLB + Draco, rotação e flutuação
├── types.ts
└── index.ts
```
