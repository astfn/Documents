import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div id="max">
        <Header />
        <MainCpn />
        <Footer />
      </div>
    );
  }
}

function Header() {
  return (
    <header>
      <h1>Header</h1>
    </header>
  );
}
function MainCpn() {
  return (
    <main>
      <ArticleCpn1 />
      <ArticleCpn2 />
    </main>
  );
}
function ArticleCpn1() {
  return <article>这是内容片段1</article>;
}
function ArticleCpn2() {
  return (
    <article>
      这是内容片段2:
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
      </ul>
    </article>
  );
}
function Footer() {
  return (
    <footer>
      <h1>footer</h1>
    </footer>
  );
}
