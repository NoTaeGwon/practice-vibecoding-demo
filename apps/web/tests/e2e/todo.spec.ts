import { test, expect } from "@playwright/test";

test.describe("TODO 우선순위 및 필터링", () => {
  test.beforeEach(async ({ page }) => {
    // 항상 깨끗한 상태에서 시작하도록 localStorage 초기화
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
  });

  test("TODO를 추가하면 목록과 카운트가 갱신된다", async ({ page }) => {
    await page.getByTestId("todo-input").fill("Playwright TODO");
    // 중요도 셀렉트 클릭 후 "높음" 옵션 선택
    await page
      .getByRole("textbox", { name: "중요도", exact: true })
      .click();
    await page.getByRole("option", { name: "높음" }).click();
    await page.getByTestId("add-todo-button").click();

    // TODO 항목과 우선순위 뱃지, 카운트 텍스트 검증
    await expect(page.getByTestId("todo-list")).toBeVisible();
    await expect(page.getByText("Playwright TODO")).toBeVisible();
    await expect(page.getByTestId("todo-priority-badge")).toHaveText("높음");
    await expect(page.getByTestId("todo-count-text")).toHaveText(
      "총 1개의 할 일이 있습니다."
    );
  });

  test("중요도 필터로 high 우선순위만 볼 수 있다", async ({ page }) => {
    // low 우선순위 TODO 추가
    await page.getByTestId("todo-input").fill("낮은 중요도 TODO");
    await page
      .getByRole("textbox", { name: "중요도", exact: true })
      .click();
    await page.getByRole("option", { name: "낮음" }).click();
    await page.getByTestId("add-todo-button").click();

    // high 우선순위 TODO 추가
    await page.getByTestId("todo-input").fill("높은 중요도 TODO");
    await page
      .getByRole("textbox", { name: "중요도", exact: true })
      .click();
    await page.getByRole("option", { name: "높음" }).click();
    await page.getByTestId("add-todo-button").click();

    // 전체에서는 두 개 모두 보여야 함
    await expect(page.getByText("낮은 중요도 TODO")).toBeVisible();
    await expect(page.getByText("높은 중요도 TODO")).toBeVisible();

    // 중요도 필터를 high로 설정 ("높음만" 옵션 선택)
    await page
      .getByRole("textbox", { name: "중요도 필터", exact: true })
      .click();
    await page.getByRole("option", { name: "높음만" }).click();

    await expect(page.getByText("높은 중요도 TODO")).toBeVisible();

    // 필터 적용 후 high 항목만 남는지 리스트 개수로도 확인
    const items = await page.getByTestId("todo-item").all();
    expect(items).toHaveLength(1);
  });
});


