import { ItemStack, MinecraftItemTypes } from "mojang-minecraft";

export const menus = new Map();

export function updateUI (ent, name) {
    const inv = ent.getComponent('minecraft:inventory').container;
    const stored = [];
    
    for (var i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item) stored.push(item);
        else stored.push(new ItemStack(MinecraftItemTypes.bedrock, 0));
    };
    menus.set(name, stored);
};