import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { findControl } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';

async function assertControl(assert){
  let control = await findControl('Label of control');
  let input = find('#control');
  assert.equal(control, input);
}

module('Integration | Helper | findControl', function(hooks) {
  setupRenderingTest(hooks);

  module('Percivable by label', function(){

    test('it finds input', async function(assert) {
      await render(hbs`
        <label for='control'>Label of control</label>
        {{input id="control" type="text"}}
      `);
      assertControl(assert);
    });

    test('it finds textarea', async function(assert) {
      await render(hbs`
        <label for='control'>Label of control</label>
        <textarea id="control" />
      `);
      assertControl(assert);
    });

    test('it does not find a div that is targeted by label', async function(assert) {
      await render(hbs`
        <label for="control">Label of control</label>
        <div class="day-slider">
          <div id="control" class="day-slider-handle" role="slider"
             aria-valuemin="1"
             aria-valuemax="7"
             aria-valuenow="2"
             aria-valuetext="Monday">
         </div>
        </div>
      `);
      try {
        await findControl('Label of control');
      } catch(e) {
        assert.equal(e.message, `Could not find control labeled 'Label of control'`)
      }
    });
  });

  module('Percivable by aria-label', function(){
    test('finds role="slider"', async function(assert) {
      await render(hbs`
        <div class="day-slider">
          <div id="control" class="day-slider-handle" role="slider" aria-label="Label of control"
             aria-valuemin="1"
             aria-valuemax="7"
             aria-valuenow="2"
             aria-valuetext="Monday">
         </div>
        </div>
      `);
      assertControl(assert);
    });

    test('finds contenteditable="true', async function(assert) {
      await render(hbs`
        <p  id="control" role="textbox" aria-label="Label of control"> i am a strange text box</p>
      `);
      assertControl(assert);
    });

    test('finds role="textbox"', async function(assert) {
      await render(hbs`
        <p  id="control" contenteditable="true" aria-label="Label of control"> i am a strange text box</p>
      `);
      assertControl(assert);
    });
  });
});