import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // The css class name
  private theme = new BehaviorSubject<string>('light-theme');

  private theme$ = this.theme.asObservable();

  constructor(
    private overlayContainer: OverlayContainer,
    private ref: ApplicationRef
  ) {
    this.autoDarkModeDetection();
  }

  /**
   * Initially, the service checks if the value of the media query
   * for prefers-color-scheme matches the Dark Mode. If this is the case,
   * then the dark-theme is used as current theme, otherwise (even if the
   * system does not provide a Dark Mode) the light-theme is used as default theme.
   */
  autoDarkModeDetection(): void {
    // Initially check if dark mode is enabled on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    // If dark mode is enabled then directly switch to the dark-theme
    if (darkModeOn) {
      this.theme.next('dark-theme');
    }

    // Watch for changes of the preference
    // regardless addListener being deprecated it is still used as
    // an alias for EventTarget.addEventListener() backwards compatibility purposes
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      const turnOn = e.matches;
      this.theme.next(turnOn ? 'dark-theme' : 'light-theme');

      // Trigger refresh of UI
      this.ref.tick();
    });
  }

  getThemeDynamic(): Observable<string> {
    return this.theme$;
  }

  setThemeDynamic(theme: string): void {
    this.theme.next(theme);
  }

  toggleDarkTheme(isDark: boolean): void {
    this.setThemeDynamic(isDark ? 'dark-theme' : 'light-theme');
    const effectiveTheme = isDark ? 'dark-theme' : 'light-theme';
    const { classList } = this.overlayContainer.getContainerElement();
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  isDarkMode(): boolean {
    return this.theme.getValue() === 'dark-theme';
  }
}
