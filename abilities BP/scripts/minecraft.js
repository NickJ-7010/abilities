import * as mc from 'mojang-minecraft';

const listeners = [];

const oldConsole = console;
console = {
    log: function (...message) { oldConsole.warn(`§b§l[Log] §r${message}`) },
    warn: function (...message) { oldConsole.warn(`§e§l[Warn] §r${message}`) },
    error: function (...message) { oldConsole.warn(`§c§l[Error] §r${message}`) },
    info: function (...message) { oldConsole.warn(`§a§l[Info] §r${message}`) }
};

export const on = function (event, callback) {
    listeners.push({ event: event, callback: callback });
};
export const emit = function (event, data) {
    listeners.filter(listener => listener.event == event).forEach(event => event.callback(data));
};

mc.world.events.beforeChat.subscribe(event => emit('before_chat', event));
mc.world.events.beforeDataDrivenEntityTriggerEvent.subscribe(event => emit('before_data_driven_entity_trigger_event', event));
mc.world.events.beforeExplosion.subscribe(event => emit('before_explosion', event));
mc.world.events.beforeItemDefinitionEvent.subscribe(event => emit('before_item_definition', event));
mc.world.events.beforeItemUse.subscribe(event => emit('before_item_use', event));
mc.world.events.beforeItemUseOn.subscribe(event => emit('before_item_use_on', event));
mc.world.events.beforePistonActivate.subscribe(event => emit('before_piston_activate', event));
mc.world.events.blockPlace.subscribe(event => emit('block_place', event));
mc.world.events.blockBreak.subscribe(event => emit('block_break', event));
mc.world.events.blockExplode.subscribe(event => emit('block_explode', event));
mc.world.events.chat.subscribe(event => emit('chat', event));
mc.world.events.dataDrivenEntityTriggerEvent.subscribe(event => emit('data_driven_entity_trigger_event', event));
mc.world.events.effectAdd.subscribe(event => emit('effect_add', event));
mc.world.events.entityCreate.subscribe(event => emit('entity_create', event));
mc.world.events.entityHit.subscribe(event => emit('entity_hit', event));
mc.world.events.entityHurt.subscribe(event => emit('entity_hurt', event));
mc.world.events.explosion.subscribe(event => emit('explosion', event));
mc.world.events.itemCompleteCharge.subscribe(event => emit('item_complete_charge', event));
mc.world.events.itemDefinitionEvent.subscribe(event => emit('item_definition', event));
mc.world.events.itemUse.subscribe(event => emit('item_use', event));
mc.world.events.itemUseOn.subscribe(event => emit('item_use_on', event));
mc.world.events.messageReceive.subscribe(event => emit('message_receive', event));
mc.world.events.pistonActivate.subscribe(event => emit('piston_activate', event));
mc.world.events.playerJoin.subscribe(event => emit('player_join', event));
mc.world.events.playerLeave.subscribe(event => emit('player_leave', event));
mc.world.events.tick.subscribe(event => emit('tick', event));
mc.world.events.weatherChange.subscribe(event => emit('weather_change', event));