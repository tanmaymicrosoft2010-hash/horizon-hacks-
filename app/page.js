import Link from "next/link";
import Motion from "@/components/Motion";
import HomeSignInButton from "@/components/HomeSignInButton";
import { sessionUid } from "@/lib/auth";

function WaveText({ text }) {
  return (
    <>
      {Array.from(text, (character, index) => (
        <span
          className="ch"
          aria-hidden="true"
          key={index}
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {character}
        </span>
      ))}
    </>
  );
}

export default async function Home() {
  const authed = !!(await sessionUid());
  return (<>
    <Motion />
    <nav>
      <div className="navl">
        <a className="u" href="#about">About</a>
        <a className="u" href="#steps">Steps</a>
        <a className="u" href="#dates">Dates</a>
      </div>
      <a className="mk" href="#top">H.</a>
      <span className="navr">{!authed && <Link className="u" href="/login">Log in</Link>}<Link className="pill" href={authed ? "/dashboard" : "/register"}>{authed ? "Dashboard" : "Register"}</Link></span>
    </nav>
    <main id="top">
      <header className="hero">
        <h1 aria-label="Horizon.Hacks, May 2027"><span className="giant g1" aria-hidden="true">HORIZON</span><span className="giant s" aria-hidden="true">.HACKS</span></h1>
        <p className="stmt">Horizon.Hacks is a hackathon built around a simple belief: <span className="rl">Builders move the world.</span> We are an unruly group of makers. Looking to shift the line between what is → and what can be. <span className="dim">We build different.</span></p>
      </header>
      <section className="ty" aria-label="Build past the edge">
        <div className="badge" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><path id="bc" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0" /></defs><text><textPath href="#bc">Build past the edge • May 2027 • </textPath></text></svg><b>H</b></div>
        <p className="a slide l" aria-label="Build"><WaveText text="Build" /></p><p className="b">different</p><p className="c slide r" aria-label="Past"><WaveText text="Past" /></p>
        <p className="d">the</p><p className="e slide l" aria-label="Edge"><WaveText text="Edge" /></p>
        <p className="f"><span>No</span><i>&amp;</i><span>Rules</span></p>
        <p className="g2"><b>Ship</b><span>/</span><b>Break</b><span>/</span><b>Repeat</b><span>/</span><b>Win</b></p>
      </section>
      <section className="cta" id="join"><h2>NEW <span className="bk">B</span>uilders</h2>
        <div><Link className="calink" href={authed ? "/dashboard" : "/register"}>Let’s build</Link></div></section>
      <section id="about"><span className="tag"><b>[02]</b> // About</span>
        <div className="wwd"><span className="lab">What we do</span><p>Horizon.Hacks is a <em>hackathon</em>. We bring builders together, give them a clock and a track, and see what <em>exists by the end</em> of the weekend.</p></div></section>
      <section id="steps"><span className="tag"><b>[03]</b> // Steps</span>
        <div className="steps-wrap">
          <div className="steps-head">
            <span className="lab">How it works</span>
            <h2 className="steps-title">FOUR STEPS. <span className="bk">Z</span>ERO EXCUSES.</h2>
          </div>
          <div className="steps-grid">
            <div className="step-item">
              <span className="step-num">01</span>
              <div className="step-body">
                <h3 className="step-title">Sign up for Horizon Hacks</h3>
                <p className="step-desc">Create your builder account, lock in your spot, and join the roster for <em>May 2027</em>.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-num">02</span>
              <div className="step-body">
                <h3 className="step-title">Grab friends (or make new friends) and form a team of 3-4</h3>
                <p className="step-desc">Form your crew of <em>3–4 builders</em>. Bring your friends or connect with other makers right on the dashboard.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-num">03</span>
              <div className="step-body">
                <h3 className="step-title">Learn from workshops, enjoy free food and merch!</h3>
                <p className="step-desc">Sharpen your edge in hands-on workshops, fuel your sprint with <em>free meals and drinks</em> all weekend, and grab exclusive custom swag.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-num">04</span>
              <div className="step-body">
                <h3 className="step-title">Build your project and publish on anywhere</h3>
                <p className="step-desc">Hack without boundaries. Push code, build past the edge, and <em>publish your project anywhere</em> for the world to see.</p>
              </div>
            </div>
          </div>
        </div></section>
      <section id="dates"><span className="tag"><b>[01]</b> // Dates</span>
        <div className="dt"><span className="g">MAY</span><span className="g">2027</span><span className="n u">Exact dates, venue and format to be announced</span></div>
        <div className="dates-login-mid">
          <HomeSignInButton authed={authed} />
          {!authed && <p className="dates-login-sub">Don’t have an account? <Link href="/register">Register</Link></p>}
        </div></section>
    </main>
  </>);
}
