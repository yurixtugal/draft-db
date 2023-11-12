import { DraftWithCollection } from "@/types/types";


interface DrawDraftInterface {
    draft: DraftWithCollection;
}

export function orderDraft({ draft }: DrawDraftInterface) {
    // First, we will order the attributes of each collection
    draft.collections.forEach((collection) => {
        collection.fields.sort(
            (fieldA, fieldB) => {
                //We order them so the PK go first
                if (fieldA.settings.isPK && !fieldB.settings.isPK)
                    return -1;

                if (fieldB.settings.isPK && !fieldA.settings.isPK)
                    return 1;

                return 0;
            }
        );
    })

}