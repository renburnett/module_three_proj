
class Leaderboard {
  constructor () {
    this.leaderboardDiv = document.getElementById('users-container');
    this.leaderboardWindow = document.getElementById('leaderboard-window');

    this.displayAccount = this.displayAccount.bind(this);
    this.displayAccounts = this.displayAccounts.bind(this);
    this.displayAccountBestRun = this.displayAccountBestRun.bind(this);
    this.createAccountDiv = this.createAccountDiv.bind(this);
    this.getBestRun = this.getBestRun.bind(this);
    this.createBestRunElements = this.createBestRunElements.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleLeaderboardToggle = this.handleLeaderboardToggle.bind(this);
  }

  fetchUsers () {
    fetch('http://localhost:3000/accounts')
      .then(res => res.json())
      .then(json => this.displayAccounts(json));
  }

  displayAccounts (accounts) {
    for (const account of accounts) {
      this.displayAccount(this.createAccountDiv(account));
      this.displayAccountBestRun(this.createBestRunElements(account));
    }
  }

  displayAccount (accountDiv) {
    this.leaderboardDiv.append(accountDiv);
  }

  displayAccountBestRun (bestRunElements) {
    for (const ele of bestRunElements) {
      this.leaderboardDiv.append(ele);
    }
  }

  createAccountDiv (account) {
    const accountDiv = document.createElement('div');
    const accountH3 = document.createElement('h3');
    accountH3.textContent = account.username;
    accountDiv.append(accountH3);

    return accountDiv;
  }

  getBestRun (runs) {
    let bestRun = runs[0];
    for (const run of runs) {
      if (run.score > bestRun.score) {
        bestRun = run;
      }
    }
    return bestRun;
  }

  createBestRunElements (account) {
    const runScoreP = document.createElement('p');
    const runWordsTyped = document.createElement('p');
    const runWordsSeen = document.createElement('p');

    const bestRun = this.getBestRun(account.runs);

    if (bestRun) {
      runScoreP.textContent = bestRun.score;
      runWordsTyped.textContent = bestRun.words_typed;
      runWordsSeen.textContent = bestRun.words_seen;
    }

    return [runScoreP, runWordsTyped, runWordsSeen];
  }

  handleLeaderboardToggle () {
    const leaderboardToggle = document.getElementById('leaderboard-toggle');
    leaderboardToggle.addEventListener('click', (event) => {
      this.leaderboardWindow.classList.toggle('hidden');
      leaderboardToggle.parentElement.classList.toggle('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const leaderboard = new Leaderboard();

  leaderboard.fetchUsers();
  leaderboard.handleLeaderboardToggle();
});