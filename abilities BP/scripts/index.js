import * as chestUI from './chestUI.js';
import * as Minecraft from './minecraft.js';
import { BlockLocation, Enchantment, EnchantmentList, EnchantmentSlot, EnchantmentType, EntityQueryOptions, Items, ItemStack, Location, MinecraftEffectTypes, MinecraftEnchantmentTypes, Vector, world } from 'mojang-minecraft';

const gameStorage = { piano: { timer: 0, oresLeft: -1 }, lindsay: { timer: 0 }, nugget: { timer: 0, hp: 20, dimension: null, pos: null, rot: null, cow: -1 }, nick: { timer: 0 }, mason: { water: 24 } };

Minecraft.on('player_join', event => {
    world.getDimension('overworld').runCommand('gamerule showtags false');
    if (event.player.nameTag == 'NJ7010') {
        event.player.addTag('giveFlight');
    }
});

Minecraft.on('before_item_use_on', event => {
    if (event.source.nameTag == 'CommandrSalt' && event.item.id == 'minecraft:skull' && !event.item.nameTag && event.item.data == 1 && event.item.amount == 1) {
        event.cancel = true;
    } else if (event.source.nameTag == 'Nugget7981') {
        if (event.source.dimension.getBlock(event.blockLocation).id == 'minecraft:cake') {
            event.cancel = true;
        };
    };
});

Minecraft.on('before_item_use', event => {
    if (event.source.nameTag == 'Nugget7981') {
        if (['minecraft:chicken', 'minecraft:porkchop', 'minecraft:beef', 'minecraft:mutton', 'minecraft:rabbit', 'minecraft:cod', 'minecraft:salmon', 'minecraft:tropical_fish', 'minecraft:pufferfish', 'minecraft:spider_eye', 'minecraft:rotten_flesh', 'minecraft:beetroot', 'minecraft:potato', 'minecraft:poisonous_potato', 'minecraft:carrot', 'minecraft:golden_carrot', 'minecraft:apple', 'minecraft:melon_slice', 'minecraft:sweet_berries', 'minecraft:glow_berries', 'minecraft:cooked_chicken', 'minecraft:cooked_porkchop', 'minecraft:cooked_beef', 'minecraft:cooked_mutton', 'minecraft:cooked_rabbit', 'minecraft:cooked_cod', 'minecraft:cooked_salmon', 'minecraft:bread', 'minecraft:mushroom_stew', 'minecraft:beetroot_soup', 'minecraft:rabbit_stew', 'minecraft:suspicious_stew', 'minecraft:baked_potato', 'minecraft:cookie', 'minecraft:pumpkin_pie', 'minecraft:dried_kelp'].includes(event.item.id)) {
            event.cancel = true;
        } else if (event.item.id == 'nj:cow') {
            if (gameStorage.nugget.timer == 0 && gameStorage.nugget.cow <= 0) {
                gameStorage.nugget.cow = 60;
                gameStorage.nugget.pos = event.source.location;
                gameStorage.nugget.rot = event.source.rotation;
                gameStorage.nugget.dimension = event.source.dimension;
                const nuggetSub = event.source.dimension.spawnEntity('minecraft:cow', event.source.location);
                nuggetSub.nameTag = event.source.nameTag;
                nuggetSub.addTag('cowSub');
                nuggetSub.addEffect(MinecraftEffectTypes.slowness, 1200, 255, false);
                nuggetSub.addEffect(MinecraftEffectTypes.resistance, 1200, 255, false);
                const cowDecoy = event.source.dimension.spawnEntity('minecraft:cow', event.source.location);
                cowDecoy.addTag('cowDecoy');
                const pHealth = event.source.getComponent('health');
                gameStorage.nugget.hp = pHealth.current;
                pHealth.setCurrent(cowDecoy.getComponent('health').current);
            } else if (gameStorage.nugget.cow > 0) {
                event.source.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have §l${gameStorage.nugget.cow}§r§c seconds left in your decoy!"}]}`);
            } else {
                event.source.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have §l${gameStorage.nugget.timer}§r§c seconds left on cooldown!"}]}`);
            };
        };
    } else if (event.source.nameTag == 'Lindsay2026' && event.item.id == 'nj:sandwich') {
        if (gameStorage.lindsay.timer == 0) {
            gameStorage.lindsay.timer = 11;
            const sandwich = Math.floor(Math.random() * 3);
            event.source.runCommand(`give @s ${sandwich == 0 ? 'nj:speed_sandwich' : sandwich == 1 ? 'nj:strength_sandwich' : 'nj:hearty_sandwich'}`);
        } else {
            event.source.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have §l${gameStorage.lindsay.timer}§r§c seconds left on cooldown!"}]}`);
        };
    } else if (event.source.nameTag == 'PianoScarf31307' && event.item.id == 'nj:ores') {
        if (gameStorage.piano.timer == 0) {
            gameStorage.piano.oresLeft = 10;
        } else {
            event.source.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have §l${gameStorage.piano.timer}§r§c seconds left on cooldown!"}]}`);
        };
    } else if (event.source.nameTag == 'NJ7010' && event.item.id == 'nj:fireball') {
        if (gameStorage.nick.timer == 0) {
            gameStorage.nick.timer = 11;
        } else {
            event.cancel = true;
            event.source.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have §l${gameStorage.nick.timer}§r§c seconds left on cooldown!"}]}`);
        };
    } else if (event.source.nameTag == 'BLU MANSOON' && event.item.id == 'nj:super_soaker') {
        if (gameStorage.mason.water > 0) {
            gameStorage.mason.water--;
        } else {
            event.cancel = true;
            event.source.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have no water left!"}]}`);
        };
    };
});

Minecraft.on('entity_hurt', event => {
    if (event.damagingEntity?.id == 'nj:water_drop') {
        event.hurtEntity.addEffect(MinecraftEffectTypes.slowness, 100, 4, true);
        event.hurtEntity.addEffect(MinecraftEffectTypes.blindness, 100, 0, false);
    };
});

Minecraft.on('item_complete_charge', event => {
    if (event.itemStack.id == 'nj:speed_sandwich') {
        if (event.source.nameTag == 'Lindsay2026') {
            event.source.addEffect(MinecraftEffectTypes.speed, 200, 1, false);
            event.source.addEffect(MinecraftEffectTypes.jumpBoost, 200, 1, false);
        } else {
            event.source.addEffect(MinecraftEffectTypes.speed, 200, 1, false);
            event.source.addEffect(MinecraftEffectTypes.jumpBoost, 200, 1, false);
            if ([...world.getPlayers()].find(plr => plr.nameTag == 'Lindsay2026')) {
                const player = [...world.getPlayers()].find(plr => plr.nameTag == 'Lindsay2026');
                player.addEffect(MinecraftEffectTypes.speed, 200, 2, false);
                player.addEffect(MinecraftEffectTypes.jumpBoost, 200, 2, false);
            };
        };
    } else if (event.itemStack.id == 'nj:strength_sandwich') {
        if (event.source.nameTag == 'Lindsay2026') {
            event.source.addEffect(MinecraftEffectTypes.strength, 200, 1, false);
            event.source.addEffect(MinecraftEffectTypes.resistance, 200, 1, false);
        } else {
            event.source.addEffect(MinecraftEffectTypes.strength, 200, 1, false);
            event.source.addEffect(MinecraftEffectTypes.resistance, 200, 1, false);
            if ([...world.getPlayers()].find(plr => plr.nameTag == 'Lindsay2026')) {
                const player = [...world.getPlayers()].find(plr => plr.nameTag == 'Lindsay2026');
                player.addEffect(MinecraftEffectTypes.strength, 200, 2, false);
                player.addEffect(MinecraftEffectTypes.resistance, 200, 2, false);
            };
        };
    } else if (event.itemStack.id == 'nj:hearty_sandwich') {
        if (event.source.nameTag == 'Lindsay2026') {
            event.source.addEffect(MinecraftEffectTypes.saturation, 500, 1, false);
            event.source.addEffect(MinecraftEffectTypes.regeneration, 200, 1, false);
        } else {
            event.source.addEffect(MinecraftEffectTypes.saturation, 500, 1, false);
            event.source.addEffect(MinecraftEffectTypes.regeneration, 200, 1, false);
            if ([...world.getPlayers()].find(plr => plr.nameTag == 'Lindsay2026')) {
                const player = [...world.getPlayers()].find(plr => plr.nameTag == 'Lindsay2026');
                player.addEffect(MinecraftEffectTypes.saturation, 500, 2, false);
                player.addEffect(MinecraftEffectTypes.regeneration, 200, 2, false);
            };
        };
    };
});

Minecraft.on('tick', event => {
    if ([...world.getPlayers()].find(plr => plr.nameTag == 'Nugget7981')) {
        const player = [...world.getPlayers()].find(plr => plr.nameTag == 'Nugget7981');
        const cowSubQuery = new EntityQueryOptions();
        cowSubQuery.tags = ['cowSub'];
        for (const entity of player.dimension.getEntities(cowSubQuery)) {
            if (gameStorage.nugget.cow == 0) {
                entity.teleport(new Location(entity.location.x, -200, entity.location.z), entity.dimension, 0, 0);
                break;
            };
            entity.teleport(gameStorage.nugget.pos, entity.dimension, gameStorage.nugget.rot.x, gameStorage.nugget.rot.y);
        };
        const cowDecoyQuery = new EntityQueryOptions();
        cowDecoyQuery.tags = ['cowDecoy'];
        var alive = false;
        for (const entity of player.dimension.getEntities(cowDecoyQuery)) {
            alive = true;
            if (gameStorage.nugget.cow == 0) {
                entity.kill();
                break;
            };
            const pHealth = player.getComponent('health');
            const health = entity.getComponent('health');
            if (health.current > 0) pHealth.setCurrent(health.current);
            entity.teleport(player.location, player.dimension, player.rotation.x, player.rotation.y);
            player.addEffect(MinecraftEffectTypes.invisibility, 40, 1, false);
        };
        if (!alive && gameStorage.nugget.cow >= 0) {
            player.getComponent('health').setCurrent(gameStorage.nugget.hp);
            player.teleport(gameStorage.nugget.pos, gameStorage.nugget.dimension, gameStorage.nugget.rot.x, gameStorage.nugget.rot.y);
            gameStorage.nugget.cow = -1;
            gameStorage.nugget.timer = 31;
            for (const entity of gameStorage.nugget.dimension.getEntities(cowSubQuery)) {
                entity.teleport(new Location(entity.location.x, -100, entity.location.z), entity.dimension, 0, 0);
            };
        };
    };
    if (event.currentTick % 20 == 0) {
        for (const player of world.getPlayers()) {
            switch (player.nameTag) {
                case 'NJ7010':
                    if (!player.hasTag('initated')) {
                        player.addTag('initated');
                        player.runCommand('replaceitem entity @s slot.armor.head 0 nj:glasses 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
                        player.runCommand('give @s nj:fireball 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
                    } else if (player.hasTag('giveFlight')) {
                        player.removeTag('giveFlight');
                        player.runCommand('ability @s mayfly true');
                    } else if (player.getComponent('health').current == 0) {
                        player.removeTag('alive');
                    } else if (!player.hasTag('alive')) {
                        player.teleport(new Location(0, 100, 0), world.getDimension('the_end'), 0, 0);
                        player.addTag('alive');
                    } else {
                        gameStorage.nick.timer = Math.max(gameStorage.nick.timer - 1, 0);
                        player.onScreenDisplay.setActionBar(`§6Fireball: §l${gameStorage.nick.timer == 0 ? '§aReady!' : `§c${gameStorage.nick.timer}`}`);
                        try {
                            world.getDimension('overworld').runCommand('testfor @a[name="NJ7010",hasitem={location=slot.armor.head,slot=0,item=nj:glasses,data=0}]');
                        } catch (e) {
                            player.addEffect(MinecraftEffectTypes.blindness, 100, 0, false);
                            player.addEffect(MinecraftEffectTypes.darkness, 100, 0, false);
                        };
                    };
                    break;
                case 'BLU MANSOON':
                    player.onScreenDisplay.setActionBar(`§3Water Remaining: §l§9${gameStorage.mason.water}/24`);
                    if (!player.hasTag('initated')) {
                        player.runCommand('give @s nj:super_soaker 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
                        player.addTag('initated');
                    } else {
                        const block = player.dimension.getBlock(new BlockLocation(player.location.x < 0 ? player.location.x - 1 : player.location.x, player.location.y < 0 ? player.location.y - 1 : player.location.y, player.location.z < 0 ? player.location.z - 1 : player.location.z));
                        if (block.id == 'minecraft:water' || block.isWaterlogged) {
                            player.addEffect(MinecraftEffectTypes.conduitPower, 100, 1, false);
                        } else {
                            player.addEffect(MinecraftEffectTypes.slowness, 100, 1, false);
                        };
                    };
                    break;
                case 'Lindsay2026':
                    gameStorage.lindsay.timer = Math.max(gameStorage.lindsay.timer - 1, 0);
                    player.onScreenDisplay.setActionBar(`§6Make Sandwich: §l${gameStorage.lindsay.timer == 0 ? '§aReady!' : `§c${gameStorage.lindsay.timer}`}`);
                    if (!player.hasTag('initated')) {
                        player.runCommand('give @s nj:sandwich 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
                        player.addTag('initated');
                    } else {
                        player.addEffect(MinecraftEffectTypes.nightVision, 100, 0, false);
                    };
                    break;
                case 'Nugget7981':
                    if (gameStorage.nugget.cow == 0) {
                        gameStorage.nugget.timer = 31;
                        gameStorage.nugget.cow--;
                    };
                    gameStorage.nugget.timer = Math.max(gameStorage.nugget.timer - 1, 0);
                    gameStorage.nugget.cow = Math.max(gameStorage.nugget.cow - 1, -1);
                    player.onScreenDisplay.setActionBar(`§dCow Decoy: §l${gameStorage.nugget.cow > 0 ? `§6${gameStorage.nugget.cow} Left` : gameStorage.nugget.timer == 0 ? '§aReady!' : `§c${gameStorage.nugget.timer}`}`);
                    if (!player.hasTag('initated')) {
                        player.runCommand('give @s nj:cow 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
                        player.addTag('initated');
                    } else {
                        player.addEffect(MinecraftEffectTypes.resistance, 100, 1, false);
                    };
                    break;
                case 'PianoScarf31307':
                    if (gameStorage.piano.oresLeft == 0) {
                        gameStorage.piano.timer = 21;
                        gameStorage.piano.oresLeft--;
                    };
                    gameStorage.piano.timer = Math.max(gameStorage.piano.timer - 1, 0);
                    player.onScreenDisplay.setActionBar(`§9Multiply Ores: §l${gameStorage.piano.oresLeft > 0 ? `§6${gameStorage.piano.oresLeft} Left` : gameStorage.piano.timer == 0 ? '§aReady!' : `§c${gameStorage.piano.timer}`}`);
                    if (!player.hasTag('initated')) {
                        player.runCommand('give @s nj:ores 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
                        player.addTag('initated');
                    } else {
                        player.addEffect(MinecraftEffectTypes.villageHero, 100, 0, false);
                        player.addEffect(MinecraftEffectTypes.weakness, 100, 0, false);
                    };
                    break;
                case 'CommandrSalt':
                    if (!player.hasTag('initated')) {
                        player.addTag('initated');
                        player.runCommand('replaceitem entity @s slot.armor.head 0 minecraft:skull 1 1 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
                    } else {
                        player.addEffect(MinecraftEffectTypes.invisibility, 100, 0, true);
                        try {
                            world.getDimension('overworld').runCommand('testfor @a[name="CommandrSalt",hasitem={location=slot.armor.head,slot=0,item=skull,data=1}]');
                        } catch (e) {
                            player.addEffect(MinecraftEffectTypes.weakness, 100, 1, false);
                        };
                    };
                    break;
                case 'dcljadl':
                    if (player.getComponent('health').current <= 5 && player.getComponent('health').current != 0) {
                        player.getComponent('health').setCurrent(10);
                        player.runCommand(`tellraw @a {"rawtext":[{"translate":"§emultiplayer.player.left.realms","with":["${player.name}"]}]}`);
                        player.triggerEvent('nj:kick');
                    };
                    break;
            };
        };
    };
});

Minecraft.on('block_break', event => {
    if (event.player.nameTag == 'Nugget7981') {
        if (['minecraft:grass', 'minecraft:tallgrass'].includes(event.brokenBlockPermutation.type.id) || (event.brokenBlockPermutation.type.id == 'minecraft:wheat' && event.brokenBlockPermutation.getProperty('growth').value == 7)) {
            event.player.addEffect(MinecraftEffectTypes.saturation, 250, 0, false);
            event.player.addEffect(MinecraftEffectTypes.regeneration, 25, 2, false);
        };
    } else if (event.player.nameTag == 'PianoScarf31307' && gameStorage.piano.oresLeft > 0) {
        const inv = event.player.getComponent('inventory').container;
        const item = inv.getItem(event.player.selectedSlot);
        if (item?.getComponent('enchantments').enchantments.hasEnchantment(MinecraftEnchantmentTypes.silkTouch) == 0) {
            if (['minecraft:iron_ore', 'minecraft:deepslate_iron_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load iron_ingot ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (['minecraft:gold_ore', 'minecraft:deepslate_gold_ore', 'minecraft:nether_gold_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load gold_ingot ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (['minecraft:diamond_ore', 'minecraft:deepslate_diamond_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load diamond ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (['minecraft:lapis_ore', 'minecraft:deepslate_lapis_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load lapis ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (['minecraft:lit_redstone_ore', 'minecraft:lit_deepslate_redstone_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load redstone ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (['minecraft:coal_ore', 'minecraft:deepslate_coal_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load coal ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (['minecraft:copper_ore', 'minecraft:deepslate_copper_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load copper ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (['minecraft:emerald_ore', 'minecraft:deepslate_emerald_ore'].includes(event.brokenBlockPermutation.type.id)) {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load emerald ${event.block.x} ${event.block.y} ${event.block.z}`);
            } else if (event.brokenBlockPermutation.type.id == 'minecraft:quartz_ore') {
                gameStorage.piano.oresLeft--;
                event.player.runCommand(`structure load quartz ${event.block.x} ${event.block.y} ${event.block.z}`);
            };
        };
    };
});

Minecraft.on('entity_hit', event => {
    if (event.entity.nameTag == 'CommandrSalt') {
        try {
            world.getDimension('overworld').runCommand('testfor @a[name="CommandrSalt",hasitem={location=slot.armor.head,slot=0,item=skull,data=1}]');
            event.hitEntity.addEffect(MinecraftEffectTypes.wither, 200, 1, false);
        } catch (e) {}
    };
});

Minecraft.on('before_chat', event => {
    if (event.message.startsWith('$')) {
        event.sender.nameTag = event.message.slice(1);
    } else if (event.message == 'clear') {
        event.sender.runCommand('clear @s')
    } else if (event.message == 'items') {
        event.sender.removeTag('initated');
    };
});

const parseJSON = function (input) {
    let type = Object.prototype.toString.call(input).slice(8, -1);
    if (type != 'Object' && type != 'Array' && !(input?.prototype?.constructor?.name ?? '')) return input;
    function formVal(val, key) {
        if (key == 'Number') {
            return `§6${val}`;
        } else if (key == 'Undefined') {
            return `§4${val}`;
        } else if (key == 'String') {
            return `§a\\"${val}§a\\"`;
        } else if (key == 'Boolean') {
            return `§d${val}`;
        } else if (key == 'Null') {
            return `§3${val}`;
        } else {
            return `§f${val}`
        };
    };
    const exec = (i, d = '§8:§f  ') => {
        let o = [];
        for (let p in i) {
            let v = i[p];
            let type = Object.prototype.toString.call(v).slice(8, -1), constructorName = v?.constructor?.name ?? '', className = v?.prototype?.constructor?.name ?? '';
            try {
                if (type == 'Object' || type == 'Array') {
                    let x = (type == 'Object' ? ['{', '}'] : ['[', ']']);
                    o.push(`${d}§c${p}§f: ${x[0]}  §8§o${constructorName}§f`, ...exec(v, d + '§8:§f  '), `${d}${x[1]}`);
                }
                else if (className) {
                    o.push(`${d}§c${p}§f: §a[class ${className}]§f  {`, ...exec(v, d + '§8:§f  '), `${d}}`);
                }
                else if (type == 'Function') {
                    o.push(`${d}§c${p}§f: §9[Function]§f`);
                }
                else {
                    o.push(`${d}§c${p}§f: ${formVal(`${v}`, type)}`);
                }
            }
            catch (e) {
                o.push(`${d}§c${p}§f: §c[Unknown]§r  §8§o${constructorName}§f`);
            }
        }
        return o;
    };
    return `{\n${exec(input).join('§r\n')}\n§r}`;
};