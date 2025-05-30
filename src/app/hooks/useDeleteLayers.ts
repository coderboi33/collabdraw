import { useMutation, useSelf } from "../../../liveblocks.config"

export const useDeleteLayers = () => {
    const selection = useSelf((self) => self.presence.selection);
    return useMutation(({ storage, setMyPresence }) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");

        if (!selection) return; // Add null check

        for (const layerId of selection) {
            liveLayers.delete(layerId);
            const index = liveLayerIds.indexOf(layerId);
            if (index !== -1) {
                liveLayerIds.delete(index);
            }
        }
        setMyPresence({ selection: [] }, { addToHistory: true });
    }, [selection]);
}