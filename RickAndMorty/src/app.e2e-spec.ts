// File: e2e/src/app.e2e-spec.ts
import { browser, by, element } from 'protractor';

describe('RickAndMorty App', () => {
  beforeEach(async () => {
    await browser.get('/');
  });

  it('should display the first page of characters', async () => {
    const characterCards = await element.all(by.css('.character-card'));
    expect(characterCards.length).toBeGreaterThan(0);

    for (let card of characterCards) {
      const image = await card.findElement(by.css('.character-image')).getAttribute('src');
      const name = await card.findElement(by.css('.character-name')).getText();
      const status = await card.findElement(by.css('.character-status')).getText();
      const species = await card.findElement(by.css('.character-species')).getText();
      const gender = await card.findElement(by.css('.character-gender')).getText();

      expect(image).toBeTruthy();
      expect(name).toBeTruthy();
      expect(status).toMatch(/Status: \w+/);
      expect(species).toMatch(/Species: \w+/);
      expect(gender).toMatch(/Gender: \w+/);
    }
  });

  it('should navigate through all pages and display characters', async () => {
    for (let page = 1; page <= 42; page++) {
      if (page > 1) {
        const nextButton = await element(by.css('.pagination button:last-child'));
        await nextButton.click();
      }

      const url = await browser.getCurrentUrl();
      expect(url).toContain(`page=${page}`);

      const characterCards = await element.all(by.css('.character-card'));
      expect(characterCards.length).toBeGreaterThan(0);

      for (let card of characterCards) {
        const image = await card.findElement(by.css('.character-image')).getAttribute('src');
        const name = await card.findElement(by.css('.character-name')).getText();
        const status = await card.findElement(by.css('.character-status')).getText();
        const species = await card.findElement(by.css('.character-species')).getText();
        const gender = await card.findElement(by.css('.character-gender')).getText();

        expect(image).toBeTruthy();
        expect(name).toBeTruthy();
        expect(status).toMatch(/Status: \w+/);
        expect(species).toMatch(/Species: \w+/);
        expect(gender).toMatch(/Gender: \w+/);
      }
    }
  });
});