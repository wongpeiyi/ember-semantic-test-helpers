import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import FindByName from 'ember-semantic-test-helpers/test-support/finders/find-by-name';
import { textQuery } from 'ember-semantic-test-helpers/test-support/definitions/selectors';
let findByName = FindByName.run;
module('Integration | Helper | FindByName', function(hooks) {
  setupRenderingTest(hooks);

  test('it selects the correct element', async function(assert){
    await render(hbs`
      <input name="hello" />
      <input name="world" />
    `);
    let foundInput = findByName(textQuery, 'hello');
    let expected = document.querySelectorAll("[name='hello']")[0];
    assert.equal(foundInput.length, 1);
    assert.equal(foundInput[0], expected);
  });
});
