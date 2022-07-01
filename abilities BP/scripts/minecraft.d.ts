import { Player, Dimension, BlockLocation, Entity, ItemStack, BlockPistonComponent, BlockPermutation, Block } from 'mojang-minecraft';

interface BeforeChat {
    /**
    * If set to true in a beforeChat event handler, this message
    * is not broadcast out.
    */
    "cancel": boolean;
    /**
     * Message that is being broadcast. In a beforeChat event
     * handler, _message_ can be updated with edits before the
     * message is displayed to players.
     */
    "message": string;
    /**
     * Player that sent the chat message.
     */
    "sender": Player;
    /**
     * If true, this message is directly targeted to one or more
     * players (i.e., is not broadcast.)
     */
    "sendToTargets": boolean;
    /**
     * List of players that will receive this message.
     */
    "targets": Player[];
}
interface BeforeExplosion {
    /**
    * If set to true, cancels the explosion event.
    */
    "cancel": boolean;
    /**
     * Dimension where the explosion has occurred.
     */
    readonly "dimension": Dimension;
    /**
     * A collection of blocks impacted by this explosion event.
     * Note that this property can be updated to change the set of
     * blocks impacted.
     */
    "impactedBlocks": BlockLocation[];
    /**
     * Optional source of the explosion.
     */
    readonly "source": Entity;
}
interface BeforeItemDefinition {
    /**
    * If set to true, will cancel the application of this item
    * definition change.
    */
    "cancel": boolean;
    /**
     * Name of the data-driven item event that is triggering this
     * change.
     */
    readonly "eventName": string;
    /**
     * The impacted item stack that is being used.
     */
    "item": ItemStack;
    /**
     * Returns the source entity that triggered this item event.
     */
    readonly "source": Entity;
}
interface BeforeItemUse {
    /**
    * If set to true, this will cancel the item use behavior.
    */
    "cancel": boolean;
    /**
     * The impacted item stack that is being used.
     */
    "item": ItemStack;
    /**
     * Returns the source entity that triggered this item event.
     */
    readonly "source": Entity;
}
interface BeforeItemUseOn {
    readonly "blockFace": number
    /**
    * Location of the block being impacted.
    */
    readonly "blockLocation": BlockLocation;
    /**
     * If set to true, this will cancel the item use behavior.
     */
    "cancel": boolean;
    /**
     * The face of the block that an item is being used on.
     */
    readonly "direction": number;
    /**
     * X coordinate of the item-use impact location on the face of
     * the target block.
     */
    readonly "faceLocationX": number;
    /**
     * Y coordinate of the item-use impact location on the face of
     * the target block.
     */
    readonly "faceLocationY": number;
    /**
     * The impacted item stack that is being used on a block.
     */
    "item": ItemStack;
    /**
     * Returns the source entity that triggered this item event.
     */
    readonly "source": Entity;
}
interface BeforePistonActivate {
    /**
    * If this is set to true within an event handler, the piston
    * activation is canceled.
    */
    "cancel": boolean;
    /**
     * True if the piston is the process of expanding.
     */
    readonly "isExpanding": boolean;
    /**
     * Contains additional properties and details of the piston.
     */
    readonly "piston": BlockPistonComponent;
}
interface BlockBreak {
    readonly "dimension": Dimension;
    "player": Player;
    "brokenBlockPermutation": BlockPermutation;
}
interface BlockExplode {
    /**
     * Block impacted by this explosion event.
     */
    readonly "destroyedBlockPermutation": BlockPermutation;
    /**
     * Optional source of the explosion.
     */
    readonly "source": Entity;
    readonly "dimension": Dimension;
    readonly "block": Block;
}
interface Chat {
    /**
     * Message that is being broadcast. In a beforeChat event
     * handler, _message_ can be updated with edits before the
     * message is displayed to players.
     */
    "message": string;
    /**
     * Player that sent the chat message.
     */
    "sender": Player;
    /**
     * If true, this message is directly targeted to one or more
     * players (i.e., is not broadcast.)
     */
    "sendToTargets": boolean;
    /**
     * List of players that will receive this message.
     */
    "targets": Player[];
}
interface EffectAdd {
    /**
    * Additional properties and details of the effect.
    */
    "effect": Effect;
    /**
     * Additional variant number for the effect.
     */
    "effectState": number;
    /**
     * Entity that the effect is being added to.
     */
    "entity": Entity;
}
interface EntityCreate {
    /**
    * New entity that was created.
    */
    "entity": Entity;
}
interface Explosion {
    /**
    * Dimension where the explosion has occurred.
    */
    readonly "dimension": Dimension;
    /**
     * A collection of blocks impacted by this explosion event.
     */
    readonly "impactedBlocks": BlockLocation[];
    /**
     * Optional source of the explosion.
     */
    readonly "source": Entity;
}
interface ItemDefinition {
    /**
    * Name of the data-driven item event that is triggering this
    * change.
    */
    readonly "eventName": string;
    /**
     * The impacted item stack that is being used.
     */
    "item": ItemStack;
    /**
     * Returns the source entity that triggered this item event.
     */
    readonly "source": Entity;
}
interface ItemUse {
    /**
    * The impacted item stack that is being used.
    */
    "item": ItemStack;
    /**
     * Returns the source entity that triggered this item event.
     */
    readonly "source": Entity;
}
interface ItemUseOn {
    /**
    * Location of the block being impacted.
    */
    readonly "blockLocation": BlockLocation;
    /**
     * The face of the block that an item is being used on.
     */
    readonly "direction": number;
    /**
     * X coordinate of the item-use impact location on the face of
     * the target block.
     */
    readonly "faceLocationX": number;
    /**
     * Y coordinate of the item-use impact location on the face of
     * the target block.
     */
    readonly "faceLocationY": number;
    /**
     * The impacted item stack that is being used on a block.
     */
    "item": ItemStack;
    /**
     * Returns the source entity that triggered this item event.
     */
    readonly "source": Entity;
}
interface PistonActivate {
    /**
    * True if the piston is the process of expanding.
    */
    readonly "isExpanding": boolean;
    /**
     * Contains additional properties and details of the piston.
     */
    readonly "piston": BlockPistonComponent;
}
interface PlayerJoin {
    /**
    * Player that has joined the world.
    */
    "player": Player;
}
interface PlayerLeave {
    /**
    * Player that has left the world.
    */
    readonly "playerName": string;
}
interface Tick {
    /**
    * Current tick at the time this event was fired.
    */
    readonly "currentTick": number;
    /**
     * Time since the last tick was fired.
     */
    readonly "deltaTime": number;
}
interface WeatherChange {
    /**
    * Dimension in which the weather has changed.
    */
    readonly "dimension": string;
    /**
     * Whether it is lightning after the change in weather.
     */
    readonly "lightning": boolean;
    /**
     * Whether it is raining after the change in weather.
     */
    readonly "raining": boolean;
}

interface Events {
    before_chat: [BeforeChat]
    before_explosion: [BeforeExplosion]
    before_item_definition: [BeforeItemDefinition]
    before_item_use: [BeforeItemUse]
    before_item_use_on: [BeforeItemUseOn]
    before_piston_activate: [BeforePistonActivate]
    block_break: [BlockBreak]
    block_explode: [BlockExplode]
    chat: [Chat]
    effect_add: [EffectAdd]
    entity_create: [EntityCreate]
    explosion: [Explosion]
    item_definition: [ItemDefinition]
    item_use: [ItemUse]
    item_use_on: [ItemUseOn]
    piston_activate: [PistonActivate]
    player_join: [PlayerJoin]
    player_leave: [PlayerLeave]
    tick: [Tick]
    weather_change: [WeatherChange]
}

export function on<E extends keyof Events> (eventName: E, callback: (...args: Events[E]) => void): void;
export function emit<E extends keyof Events> (eventName: E, data: Events[E]): void;