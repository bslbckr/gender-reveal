import { Component, computed, signal } from '@angular/core';

type Gender = 'male' | 'female' | null;

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gender-reveal');
  readonly scoreHome = signal(0);
  readonly scoreAway = signal(0);
  readonly whatIsA = signal(null as Gender);

  private readonly runningPoint = computed(() => this.scoreHome() + this.scoreAway() + 1);
  private readonly aOrB = computed(() => {
    const rem = this.runningPoint() % 4;
    return rem < 2 ? 'A' : 'B';
  }
  );
  readonly genderRatioForPoint = computed(() => {
    if (this.whatIsA != null) {
      if (this.aOrB() === 'A') {
        return `${this.whatIsA()}-matching.png`;
      } else {
        return this.whatIsA() === 'male' ? '/female-matching.png' : '/male-matching.png';
      }
    }
    return 'assets/foo.png';
  });
  public reset():void {
    this.scoreAway.set(0);
    this.scoreHome.set(0);
    this.whatIsA.set(null);
  }
  public homeScores():void {
    this.scoreHome.update(score => score + 1);
  }
  public awayScores():void {
    this.scoreAway.update(score => score + 1);
  }
  public setWhatIsA(a: Gender): void {
    this.whatIsA.set(a);
  }
}
