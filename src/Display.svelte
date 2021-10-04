<script>
    import { newNum, expression } from './calculator.js';
</script>

<div class="outer">
    <div class="inner">
        <p id="output">{$expression === '0' ? '' : $expression}</p>
        <p id="display">{ $newNum }</p>
    </div>
</div>

<style>
    p {
        margin: 0;
        min-height: 2em;
        max-width: 100%;
    }
    .outer {
        white-space: nowrap;
        overflow-y: hidden;
        height: 4em;
        margin-bottom: 1em;
        text-align: right;
        max-width: 100%;
    }
    .inner {
        float: right;
    }
    #output {
        font-size: 1em;
    }
    #display {
        font-size: 1.5em;
        font-weight: 600;
    }
</style>