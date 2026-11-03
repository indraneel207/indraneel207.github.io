import {test, expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("project explorer supports search, keyboard tabs, and engineering notes", async ({
  page
}) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", {name: "Search example datasets"});
  await expect(search).toBeEnabled();
  await search.fill("analytics");
  await expect(
    page.getByText("Customer insights", {exact: false})
  ).toBeVisible();
  await expect(page.getByText("Pipeline health", {exact: false})).toHaveCount(
    0
  );
  await search.fill("no-matches");
  await expect(
    page.getByText("No example datasets found.", {exact: false})
  ).toBeVisible();
  await page.getByRole("tab", {name: "Interface", exact: true}).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", {name: "Architecture", exact: true})
  ).toBeFocused();
  await expect(
    page.getByRole("tab", {name: "Architecture", exact: true})
  ).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", {name: "03 / ORCHESTRATION"}).click();
  await expect(
    page.getByText("Think beyond the screen.", {exact: true})
  ).toBeVisible();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`all routes fit a ${width}px viewport`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    for (const route of [
      "/",
      "/work/datahub/",
      "/work/rabitpy/",
      "/work/onboarding/",
      "/work/insuregpt/",
      "/work/research-lab/",
      "/404.html"
    ]) {
      const response = await page.goto(route);
      if (route !== "/404.html") {
        expect(response?.status(), route).toBe(200);
      }
      await expect(page.getByRole("heading", {level: 1})).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth
        ),
        route
      ).toBe(true);
    }
  });
}

test("mobile navigation closes on selection and Escape", async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto("/");
  const open = page.getByRole("button", {name: "Open navigation"});
  await open.click();
  await expect(
    page.getByRole("navigation", {name: "Mobile navigation"})
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(open).toBeFocused();
  await expect(
    page.getByRole("navigation", {name: "Mobile navigation"})
  ).toBeHidden();
  await open.click();
  await page
    .getByRole("navigation", {name: "Mobile navigation"})
    .getByRole("link", {name: "Work", exact: true})
    .click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.getByRole("navigation", {name: "Mobile navigation"})
  ).toBeHidden();
});

test("case studies without resource lists render and preserve website links", async ({
  page
}) => {
  for (const route of ["/work/datahub/", "/work/onboarding/"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(
      page.getByRole("heading", {name: "What I owned", exact: true})
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", {name: "Project resources"})
    ).toHaveCount(0);
  }

  const response = await page.goto("/work/research-lab/");
  expect(response?.status()).toBe(200);
  await expect(
    page
      .getByRole("navigation", {name: "Project resources"})
      .getByRole("link", {name: "Visit the website"})
  ).toHaveAttribute("href", "https://shrivastavalab.com/");
});

test("theme preference persists across project pages and reloads", async ({
  page
}) => {
  await page.goto("/");
  await page.getByRole("button", {name: "Switch to dark theme"}).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("link", {name: "Explore the work", exact: true}).click();
  await expect(page).toHaveURL(/\/work\/datahub\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(
    page.getByRole("button", {name: "Switch to light theme"})
  ).toBeVisible();
});

test("portfolio and case studies remain usable without JavaScript", async ({
  browser
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: {width: 390, height: 844}
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", {level: 1})).toContainText(
    "Complex problems."
  );
  await expect(
    page.getByRole("navigation", {name: "Mobile navigation"})
  ).toBeVisible();
  await page.getByRole("link", {name: "Explore the work", exact: true}).click();
  await expect(
    page.getByRole("heading", {name: "What I owned", exact: true})
  ).toBeVisible();
  await expect(
    page.getByRole("link", {name: "BACK TO SELECTED WORK", exact: false})
  ).toHaveAttribute("href", "/#work");
  await context.close();
});

test("system theme and blocked storage do not prevent core interactions", async ({
  browser
}) => {
  const context = await browser.newContext({colorScheme: "dark"});
  await context.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      }
    });
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", {name: "Switch to light theme"}).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("heading", {level: 1})).toBeVisible();
  await context.close();
});

for (const theme of ["light", "dark"] as const) {
  test(`core pages have no detected WCAG AA violations in ${theme} mode`, async ({
    page
  }) => {
    await page.emulateMedia({colorScheme: theme, reducedMotion: "reduce"});
    for (const route of [
      "/",
      "/work/datahub/",
      "/work/rabitpy/",
      "/work/onboarding/",
      "/work/insuregpt/",
      "/work/research-lab/"
    ]) {
      await page.goto(route);
      const result = await new AxeBuilder({page})
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .options({rules: {"label-content-name-mismatch": {enabled: true}}})
        .analyze();
      expect(result.violations, route).toEqual([]);
    }
  });
}

test("email can be copied, with a useful fallback when clipboard access fails", async ({
  page,
  context
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", {name: "Copy email address"}).click();
  await expect(page.getByRole("status")).toHaveText("Email address copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "indraneel207@gmail.com"
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: async () => {
        throw new Error("Permission denied");
      }
    });
  });
  await page.getByRole("button", {name: "Copy email address"}).click();
  await expect(page.getByRole("status")).toContainText("Use the email link");
  await expect(
    page.getByRole("link", {name: "indraneel207@gmail.com"})
  ).toHaveAttribute("href", "mailto:indraneel207@gmail.com");
});

test("research and AI project cards lead to their case studies and source resources", async ({
  page
}) => {
  await page.goto("/");
  const researchCard = page.locator("#work .project-card").filter({
    has: page.getByRole("link", {name: "Explore RABiTPy", exact: true})
  });
  await expect(researchCard.getByRole("link")).toHaveCount(1);
  await researchCard.locator(".project-card-preview").scrollIntoViewIfNeeded();
  const preview = await researchCard
    .locator(".project-card-preview")
    .boundingBox();
  expect(preview).not.toBeNull();
  await page.mouse.click(
    preview!.x + preview!.width / 2,
    preview!.y + preview!.height / 2
  );
  await expect(page).toHaveURL(/\/work\/rabitpy\/$/);
  const resources = page.getByRole("navigation", {name: "Project resources"});
  await expect(
    resources.getByRole("link", {name: "Read the paper"})
  ).toHaveAttribute(
    "href",
    "https://link.springer.com/article/10.1186/s12859-025-06145-w"
  );
  await expect(
    resources.getByRole("link", {name: "Source code"})
  ).toHaveAttribute("href", "https://github.com/indraneel207/RABiTPy");
  await expect(
    resources.getByRole("link", {name: "Python package"})
  ).toHaveAttribute("href", "https://pypi.org/project/RABiTPy/");
  await page.goto("/");
  await page
    .locator("#more-work")
    .getByRole("link", {name: "Explore InsureGPT", exact: true})
    .click();
  await expect(page).toHaveURL(/\/work\/insuregpt\/$/);
  await expect(
    page
      .getByRole("navigation", {name: "Project resources"})
      .getByRole("link", {name: "Source code"})
  ).toHaveAttribute(
    "href",
    "https://github.com/indraneel207/insurance_predictor_chatgpt_extension"
  );
  await expect(
    page.getByRole("link", {name: "BACK TO MORE WORK", exact: false})
  ).toHaveAttribute("href", "/#more-work");
});
