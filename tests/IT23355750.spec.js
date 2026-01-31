const { test, expect } = require("@playwright/test");

// Configuration
const CONFIG = {
  url: "https://www.swifttranslator.com/",
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000,
  },
  selectors: {
    inputField: "Input Your Singlish Text Here.",
    outputContainer:
      "div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap",
  },
};

// Test Data - Completely New Test Cases
const TEST_DATA = {
  positive: [
    {
      tcId: "Pos_Fun_001",
      name: "Convert a future tense question about daily activity",
      input: "oyaa heta udhee paara athugaanavadha?",
      expected: "ඔයා හෙට උදේ පාර අතුගානවද?",
    },
    {
      tcId: "Pos_Fun_002",
      name: "Convert a long informal narrative with mixed English words",
      input: "Brother adha maara vaedakne unee mata. mama adha dhaval private bus ekaka gedhara aave. edhdhi paara maedhdhe loku accident ekakne. paeya dhekak vithara parakku unaa gedhara enna.",
      expected: "Brother අද මාර වැඩක්නෙ උනේ මට. මම අද දවල් private bus එකක ගෙදර ආවෙ. එද්දි පාර මැද්දෙ ලොකු accident එකක්නෙ. පැය දෙකක් විතර පරක්කු උනා ගෙදර එන්න.",
    },
    {
      tcId: "Pos_Fun_003",
      name: "Convert a polite greeting wish",
      input: "oba saemata suBha dhavasak veevaa!",
      expected: "ඔබ සැමට සුභ දවසක් වේවා!",
    },
    {
      tcId: "Pos_Fun_004",
      name: "Convert slang-based informal compliment sentence",
      input: "eLakiri machan, adha film eka patta aathal.",
      expected: "එළකිරි මචන්, අද film එක පට්ට ආතල්.",
    },
    {
      tcId: "Pos_Fun_005",
      name: "Convert short negative sentence with mixed English",
      input: "Phone ekee battery naehae",
      expected: "Phone එකේ battery නැහැ",
    },
    {
      tcId: "Pos_Fun_006",
      name: "Convert a polite request command sentence",
      input: "karuNaakaralaa mee potha pusthakaaleta aapasu baaradhenna.",
      expected: "කරුණාකරලා මේ පොත පුස්තකාලෙට ආපසු බාරදෙන්න.",
    },
    {
      tcId: "Pos_Fun_007",
      name: "Convert short present tense weather statement",
      input: "adha havasa vahii vagee.",
      expected: "අද හවස වහී වගේ.",
    },
    {
      tcId: "Pos_Fun_008",
      name: "Convert sentence with currency value and unit of measurement",
      input: "biima 750ml boothalayak rupiyal thunsiiyak venavaa",
      expected: "බීම 750ml බෝතලයක් රුපියල් තුන්සීයක් වෙනවා",
    },
    {
      tcId: "Pos_Fun_009",
      name: "Convert short sentence with currency abbreviation and numeric value",
      input: "paensalak Rs. 20 yi",
      expected: "පැන්සලක් Rs. 20 යි",
    },
    {
      tcId: "Pos_Fun_010",
      name: "Convert sentence with repeated word emphasis and future commitment",
      input:
        "hari hari, mama eeka anivaaren karala dhennan",
      expected:
        "හරි හරි, මම ඒක අනිවාරෙන් කරල දෙන්නන්",
    },
    {
      tcId: "Pos_Fun_011",
      name: "Convert apology sentence with mixed English terms and cause",
      input: "Samaavenna, mama late unaa traffic jam eka nisaa.",
      expected: "සමාවෙන්න, මම late උනා traffic jam එක නිසා.",
    },
    {
      tcId: "Pos_Fun_012",
      name: "Convert passive voice sentence with country and organization names",
      input: "aemarikaanu hamudhaava visin kaenadaavata prahaara dhiyath karanu laebuvaa.",
      expected: "ඇමරිකානු හමුදාව විසින් කැනඩාවට ප්‍රහාර දියත් කරනු ලැබුවා.",
    },
    {
      tcId: "Pos_Fun_013",
      name: "Convert informal reassurance sentence with slang",
      input: "uba baya venna epaa ban haemadheema hariyayi",
      expected: "උබ බය වෙන්න එපා බන් හැමදේම හරියයි",
    },
    {
      tcId: "Pos_Fun_014",
      name: "Convert negative sentence with mixed English and future implication",
      input: "Mata adha office enna baeri veyi",
      expected: "මට අද office එන්න බැරි වෙයි",
    },
    {
      tcId: "Pos_Fun_015",
      name: "Convert multi-line conversational input with line breaks",
      input: "Mama gedhara yanavaa.\nOyaa enavadha maath ekka?",
      expected: "මම ගෙදර යනවා.\nඔයා එනවද මාත් එක්ක?",
    },
    {
      tcId: "Pos_Fun_016",
      name: "Convert request sentence with English technical terms",
      input: "Documents tika attach karalaa mata email ekak evanna.",
      expected: "Documents ටික attach කරලා මට email එකක් එවන්න.",
    },
    {
      tcId: "Pos_Fun_017",
      name: "Convert sentence containing place name in Singlish input",
      input: "mama colombo yanna hadhanne",
      expected: "මම colombo යන්න හදන්නෙ",
    },
    {
      tcId: "Pos_Fun_018",
      name: "Convert sentence containing date format and English word",
      input: "25/12/2025 holiday ekak",
      expected: "25/12/2025 holiday එකක්",
    },
    {
      tcId: "Pos_Fun_019",
      name: "Convert long paragraph-style narrative with mixed language and minor anomalies",
      input: "adha mama pansale perahaera balanna giyaa. maara crowd ekak hitiye. kohoma hari thaenak allagaththaa. ethanata perahaera hoDHAta penunaa. kohoma hari paeya dhekak vithara giyaa perahaera ivara venna. mama oyaata yamu kivvata oyaa aave naeene maath ekka yanna. aparaadhe ali 10 dhenek vithara aevith hitiyaa. mama bus ekata late vena hindhaa ikmanata ethanin aavaa",
      expected: "අද මම පන්සලෙ පෙරහැර බලන්න ගියා. මාර crowd එකක් හිටියෙ. කොහොම හරි තැනක් අල්ලගත්තා. එතනට පෙරහැර හොඳට පෙනුනා. කොහොම හරි පැය දෙකක් විතර ගියා පෙරහැර ඉවර වෙන්න. මම ඔයාට යමු කිව්වට ඔයා ආවෙ නෑනෙ මාත් එක්ක යන්න. අපරාදෙ අලි 10 දෙනෙක් විතර ඇවිත් හිටියා. මම bus එකට late වෙන හින්දා ඉක්මනට එතනින් ආවා",
    },
    {
      tcId: "Pos_Fun_020",
      name: "Convert daily-use sentence with English abbreviation",
      input: "mage NIC eka bag eke thiyenavaa.",
      expected: "mage NIC එක bag eke තියෙනවා.",
    },
    {
      tcId: "Pos_Fun_021",
      name: "Convert Singlish sentence with negative meaning",
      input: "maQQ gaava salli naehae",
      expected: "මං ගාව සල්ලි නැහැ",
    },
    {
      tcId: "Pos_Fun_022",
      name: "Convert compound conditional sentence with negation",
      input: "adha vaessoth vii ihinna venne naee, vathura haravanna venneth naee",
      expected: "අද වැස්සොත් වී ඉහින්න වෙන්නෙ නෑ, වතුර හරවන්න වෙන්නෙත් නෑ",
    },
    {
      tcId: "Pos_Fun_023",
      name: "Convert sentence containing numeric height unit and comparison",
      input: "ee kella kaemathi usa 6FT valata vadaa vaedi kollanta",
      expected: "ඒ කෙල්ල කැමති උස 6FT වලට වඩා වැඩි කොල්ලන්ට",
    },
    {
      tcId: "Pos_Fun_024",
      name: "Convert imperative Singlish sentence with household object reference",
      input:
        "ara kaamaree thiyena kaNNaadi kuttama geenna.",
      expected:
        "අර කාමරේ තියෙන කණ්ණාඩි කුට්ටම ගේන්න.",
    },
  ],

  negative: [
    {
      tcId: "Neg_Fun_001",
      name: "Convert mixed-language request with minor script inconsistency",
      input: "hari sir mama mahindha sir ta kiyannan heta udheema meeting eka arrange karanna kiyalaa. mokadha Sir I have to pick up my son from school at 1:30 PM.",
      expected: "හරි sir මම මහින්ද sir ට කියන්නන් හෙට උදේම meeting එක arrange කරන්න කියලා. මොකද Sir I have to pick up my son from school at 1:30 PM.",
    },
    {
      tcId: "Neg_Fun_002",
      name: "Convert short mixed-language sentence with partial English conversion issue",
      input: "adha mama poddak busy. can you do this please.",
      expected: "අද මම පොඩ්ඩක් busy. can you do this please.",
    },
    {
      tcId: "Neg_Fun_003",
      name: "Convert joined-word Singlish input with missing spaces",
      input: "adhamonavadhaudheetakannathiyennee",
      expected: "අද මොනවද උදේට කන්න තියෙන්නේ",
    },
    {
      tcId: "Neg_Fun_004",
      name: "Convert mixed-language question with incorrect English phrase transliteration",
      input: "oyaa eyaa gaena poddak balanavadha? his condition is bad now.",
      expected: "ඔයා එයා ගැන පොඩ්ඩක් බලනවද? his condition is bad now.",
    },
    {
      tcId: "Neg_Fun_005",
      name: "Convert sentence with English movie title and quotation marks",
      input: "api \"Pirates of the Caribbean\" balanna yamudha?",
      expected: "අපි \"Pirates of the Caribbean\" බලන්න යමුද?",
    },
    {
      tcId: "Neg_Fun_006",
      name: "Convert mixed-language sentence with formal English phrase",
      input: "adha mama letter of resignation eka office ekata dhunnaa.",
      expected: "අද මම letter of resignation එක office එකට දුන්නා.",
    },
    {
      tcId: "Neg_Fun_007",
      name: "Convert mixed-language command with incorrect English word transliteration",
      input: "oyaa eyaagen ahanna. He will say no.",
      expected: "ඔයා එයාගෙන් අහන්න. He will say no.",
    },
    {
      tcId: "Neg_Fun_008",
      name: "Converted Onput leaves part unconverted",
      input: "aBA kadanna yamudha?",
      expected: "අඹ කඩන්න යමුද?",
    },
    {
      tcId: "Neg_Fun_009",
      name: "English word 'tyres' converts into incorrect Sinhala form",
      input: "vaedipura tyre ekak dhaaganna",
      expected: "වැඩිපුර tyre එකක් දාගන්න",
    },
    {
      tcId: "Neg_Fun_010",
      name: "Incorrect number-word mixture",
      input: "Noo!! ooka karanna epaa.",
      expected: "Noo!! ඕක කරන්න එපා.",
    },

  ],

  ui: {
    tcId: "Pos_UI_001",
    name: "Input field accepts valid Singlish text",
    input: "mama allapu gedharata yanavaa.",
    partialInput: "mama allapu",
    expectedFull: "මම අල්ලපු ගෙදරට යනවා.",
  },
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole("textbox", {
      name: CONFIG.selectors.inputField,
    });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator("textarea") })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll(
            ".w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap",
          ),
        );
        const output = elements.find((el) => {
          const isInputField =
            el.tagName === "TEXTAREA" || el.getAttribute("role") === "textbox";
          return (
            !isInputField && el.textContent && el.textContent.trim().length > 0
          );
        });
        return output !== undefined;
      },
      { timeout: 10000 },
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe("SwiftTranslator - Singlish to Sinhala Conversion Tests", () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe("Positive Functional Tests", () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(
          testCase.input,
        );
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe("Negative Functional Tests", () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(
          testCase.input,
        );
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  async function getSinhalaOutput(page) {
    return page.locator('[data-testid="sinhala-output"]'); // ← fix this selector
    // More robust version:
    // return page.locator('[data-testid="sinhala-output"], .output.sinhala, #result, .translation-result');
  }

test('Pos_UI_001: Real-time update behavior while typing', async ({ page }) => {
    const translator = new TranslatorPage(page);

    const inputField = await translator.getInputField();
    const outputLocator = await translator.getOutputField();

    await inputField.clear();
    await page.waitForTimeout(400);

    // Step 1: Type "meeka "
    await inputField.pressSequentially('meeka ');
    await page.waitForTimeout(700);
    await expect(outputLocator).toContainText(/මේක/i, { timeout: 8000 });

    // Step 2: Type "hariyanne naee "
    await inputField.pressSequentially('hariyanne naee ');
    await page.waitForTimeout(900);
    await expect(outputLocator).toContainText(/හරියන්නේ|නෑ/i, { timeout: 8000 });

    // Step 3: Type "appaa"
    await inputField.pressSequentially('appaa');
    await page.waitForTimeout(1400);

    // Final expectation: "මේක හරියන්නේ නෑ අප්පා"
    await expect(outputLocator).toContainText(
        /මේක.*හරියන්නේ.*නෑ.*අප්පා/i,
        { timeout: 6000 }
    );
});  

});