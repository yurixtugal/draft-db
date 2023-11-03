import DrawDraft from '@/components/panel/draw-draft'
import { db } from '@/lib/db'
import Image from 'next/image'

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
    <div><DrawDraft draft={draft}/></div>
  )
}
