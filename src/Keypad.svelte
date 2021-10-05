<script>
    import { keys } from "./calculator.js";
    const _keys = Object.keys(keys);
</script>

<div id="keypad">
    {#each _keys as key}
        <button
            id={key}
            class="key {keys[key].class} unselectable"
            on:click={keys[key].handler}
        >
            <div>{keys[key].display}</div>
        </button>
    {/each}
</div>

<style lang="scss">
    #keypad {
        display: grid;
        grid-template-columns: repeat(4, minmax(20px, 80px));
        grid-template-rows: repeat(5, minmax(20px, 80px));
        --first: 1 / 2;
        --second: 2 / 3;
        --third: 3 / 4;
        --fourth: 4 / 5;
        --fifth: 5 / 6;
    }
    $indices: (
        1: first,
        2: second,
        3: third,
        4: fourth,
        5: fifth,
    );
    @each $number, $place in $indices {
        .row-#{$number} {
            grid-row: var(--#{$place});
        }
        .col-#{$number} {
            grid-column: var(--#{$place});
        }
    }
    #zero {
        grid-column: 1 / 3;
    }
    #equals {
        grid-row: 4 / 6;
    }
    #add {
        grid-row: 2 / 4;
    }
    .key {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3em;
        font-weight: 600;
        margin: 3px;
        cursor: pointer;
        background-color: #f0f0f0;
        border-radius: 4px;
        transition: background-color 0.2s, transform 0.2s;
        border: none;
    }
    .unselectable {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .key:hover {
        background-color: rgb(187, 187, 187);
    }
    .key:active {
        transform: scale(0.9);
    }
    .secondary {
        background-color: #e8e8e8;
    }
    .hide {
        opacity: 0;
    }
</style>
