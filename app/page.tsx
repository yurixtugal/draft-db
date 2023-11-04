import DrawDraft from '@/components/panel/draw-draft'
import MermaidDiagram from '@/components/panel/mermaid-poc'
import { db } from '@/lib/db'
import dynamic from 'next/dynamic'

const ComponentC = dynamic(() => import('../components/panel/mermaid-poc'), { ssr: false })


export default async function Home() {
  const idDraft = "883201b1-4644-4da5-aed9-9bca62910bd1"


  const draft = await db.draft.findUnique({
    include: {
      collections: {
        include: {
          fields: {
            include: {
              typeField: true
            }
          }
        }
      }
    },
    where: {
      idDraft
    }
  })

  if (!draft) return <div>Not found</div>

  console.log(draft)
  return (
    <div>
        <DrawDraft draft={draft}/>
        <ComponentC/>
    </div>
  )
}

