import type { HomeFunctionName } from '../../test-data/pos/home-functions.js';
import { homeFunctions } from '../../test-data/pos/home-functions.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';

export type DineInToGoSwapResult = {
  firstAfterSwap: string;
  firstAfterRestore: string;
};

export class HomeFunctionLayoutFlow {
  constructor(private readonly homePage: PosHomePage) {}

  async moveFunctionToMainAndSave(
    homeUrl: string,
    targetFunction: HomeFunctionName,
    replacedFunction: HomeFunctionName,
  ): Promise<string[]> {
    await this.homePage.open(homeUrl);
    let movedCardNames = await this.homePage.readHomeFunctionCardNames();

    if (!movedCardNames.includes(targetFunction)) {
      await this.homePage.clickEdit();
      await this.homePage.selectHiddenFunction(targetFunction);
      await this.homePage.selectHomeFunction(replacedFunction);
      await this.homePage.saveFunctionLayout();
      movedCardNames = await this.homePage.readHomeFunctionCardNames();
    }

    if (movedCardNames.includes(targetFunction)) {
      await this.homePage.clickEdit();
      await this.homePage.selectHomeFunction(targetFunction);
      await this.homePage.selectHiddenFunction(replacedFunction);
      await this.homePage.saveFunctionLayout();
    }

    return movedCardNames;
  }

  async swapDineInAndTogo(homeUrl: string): Promise<DineInToGoSwapResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickEdit();
    await this.homePage.selectHomeFunction(homeFunctions.dineIn);
    await this.homePage.selectHomeFunction(homeFunctions.toGo);
    await this.homePage.saveFunctionLayout();
    const firstAfterSwap = await this.homePage.readFirstHomeFunctionCardName();

    await this.homePage.clickEdit();
    await this.homePage.selectHomeFunction(homeFunctions.toGo);
    await this.homePage.selectHomeFunction(homeFunctions.dineIn);
    await this.homePage.saveFunctionLayout();
    const firstAfterRestore = await this.homePage.readFirstHomeFunctionCardName();

    return { firstAfterSwap, firstAfterRestore };
  }

  async previewMoveFunctionWithoutSaving(
    homeUrl: string,
    targetFunction: HomeFunctionName,
    replacedFunction: HomeFunctionName,
  ): Promise<string[]> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickEdit();
    await this.homePage.selectHiddenFunction(targetFunction);
    await this.homePage.selectHomeFunction(replacedFunction);
    await this.homePage.cancelFunctionLayout();
    return this.homePage.readHomeFunctionCardNames();
  }

  async rejectMoveSessionToMain(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickEdit();
    await this.homePage.selectHiddenFunction(homeFunctions.session);
    await this.homePage.clickMainAdd();
    return this.homePage.readToastText();
  }

  async rejectMoveSessionToMore(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickEdit();
    await this.homePage.selectHiddenFunction(homeFunctions.session);
    await this.homePage.clickMoreAdd();
    return this.homePage.readToastText();
  }
}
