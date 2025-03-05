"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, Col, Container, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import FooterLinks from "./footer-pages";
import Script from "next/script";
import { useEffect, useState } from "react";
import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "../blog-card/blogCard";
import GlobalApi from "@/app/_utils/GlobalApi";

import AnimatedWrapper from "@/app/_utils/AnimatedWrapper";
import SubscribeForm from "../subscribe-form/subscribe-form";

interface FormValues {
  firstName: string;
  email: string;
  message: string;
  agreeToPrivacyPolicy: boolean;
}
export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<any[]>();
  const [quickLinks, setQuickLinks] = useState<any[]>();

  const fetchFooterData = () => {
    GlobalApi.GetFooterData().then((resp) => {
      // console.log("APi", resp?.data?.data?.attributes?.footer_links.data);
      setSocialLinks(resp?.data?.data?.socialmedias);
      setQuickLinks(resp?.data?.data?.footer_links);
    });
  };
  useEffect(() => {
    fetchFooterData();
  }, []);
  const currentYear = new Date().getFullYear();
  const {
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    // Function to set placeholders
    const setPlaceholders = () => {
      const placeholders: { [key: string]: string } = {
        Summary: "Name",
        "Email address": "Email",
        Description: "Message",
      };

      const parents = document.querySelectorAll("[data-test-title]");
      parents.forEach((parent) => {
        const testTitle = (parent as HTMLElement).getAttribute(
          "data-test-title"
        );
        if (testTitle && placeholders[testTitle]) {
          const input = (parent as HTMLElement).querySelector(
            "input, textarea"
          );
          if (input) {
            (input as HTMLInputElement | HTMLTextAreaElement).placeholder =
              placeholders[testTitle];
          }
        }
      });
    };

    const updateText = () => {
      // Select the button with class 'primary_ddae'
      const buttons =
        document.querySelector<HTMLButtonElement>(".primary_ddae");

      if (buttons) {
        // Select the nested span within the button
        const innerSpan = buttons.querySelector<HTMLSpanElement>(
          ".content_b2b8 > span"
        );

        if (innerSpan) {
          // Change the text content of the inner span
          innerSpan.textContent = "Submit";
        }
      }
    };

    // Move form container if it exists
    const formContainer = document.getElementById(
      "bf535e1f-56d7-440a-ab8f-9b261605d0fb"
    );
    const parentDiv = document.querySelector(".cool");
    if (formContainer && parentDiv) {
      parentDiv.appendChild(formContainer);
    }
    // Set placeholders initially
    setPlaceholders();

    // Optionally, observe for changes if the form is dynamically injected
    const observer = new MutationObserver(() => {
      updateText();

      setPlaceholders();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  const captchaScriptId = "recaptcha-script";
  const mainScriptId = "main-script";

  const loadScript = (scriptId: string, src: string): void => {
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
    } else {
      // Update the script src to force reload if it's already present
      script.src = src;
    }
  };

  const unloadScript = (scriptId: string): void => {
    const script = document.getElementById(scriptId);
    if (script) {
      script.remove();
    }
  };

  const loadRecaptchaScript = (): void => {
    const src = `https://www.google.com/recaptcha/api.js`;
    loadScript(captchaScriptId, src);
  };

  const loadMainScript = (): void => {
    const src = `https://sibforms.com/forms/end-form/build/main.js`;
    loadScript(mainScriptId, src);
  };

  useEffect(() => {
    loadRecaptchaScript();
    loadMainScript();

    return () => {
      unloadScript(captchaScriptId);
      unloadScript(mainScriptId);
    };
  }, []);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching or computing dynamic content
    setHtmlContent(`<div class="sib-form" style="text-align: center;
           background-color: transparent;                                 ">
    <div id="sib-form-container" class="sib-form-container">
      <div id="error-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949;max-width:540px;">
        <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
          <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
            <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
          </svg>
          <span class="sib-form-message-panel__inner-text">
                            Your subscription could not be saved. Please try again.
                        </span>
        </div>
      </div>
      <div></div>
      <div id="success-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#085229; background-color:#e7faf0; border-radius:3px; border-color:#13ce66;max-width:540px;">
        <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
          <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
            <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
          </svg>
          <span class="sib-form-message-panel__inner-text">
                            Your subscription has been successful.
                        </span>
        </div>
      </div>
      <div></div>
      <div id="sib-container" class="sib-container--large sib-container--horizontal" style="text-align:center; background-color:rgba(255,255,255,1); max-width:540px; border-radius:3px; border-width:0px; border-color:#C0CCD9; border-style:solid; direction:ltr">
      <div><h3 class="join-community">Join the ARMSP Vibrant Community</h3> 
</div><div>
      <form id="sib-form" method="POST" action="https://845d4f05.sibforms.com/serve/MUIFAL7bAgW_F8h25SFqvQmF6BYA3Lm2c70RkyPkAed40zxp9vUd56EX49BJjDcJsSmvR4s0RZAxxbuHtKxjPJmy-CJOugN0gOLcPwJsZRHGZyWb_u-h72yphDSzRq9b1YBzKoIdSGedaSEMoimlEeIhlJTwoivfQ1L7mW2wQn5qjbwRqPjIazwsDX8JqIc_8jOEZcWdsBE7k9AI" data-type="subscription">
          <div style="padding: 8px 0;">
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row form__label-row--horizontal">
  
                  <div class="entry__field">
                    <input class="input email-input" type="text" id="EMAIL" name="EMAIL" autocomplete="off" placeholder="EMAIL" data-required="true" required />
                  </div>
                </div>
  
                <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949;">
                </label>
              </div>
            </div>
          </div>
          <div style="padding: 8px 0;">
            <div class="sib-form-block" style="text-align: left">
              <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-size:16px; text-align:left; font-weight:700; color:#FFFFFF; background-color:#298dfe; border-radius:20px; border-width:0px;" form="sib-form" type="submit">
                <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
                  <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                </svg>
                Subscribe
              </button>
            </div>
          </div>
  
          <input type="text" name="email_address_check" value="" class="input--hidden">
          <input type="hidden" name="locale" value="en">
        </form>
      <div><span class="join-community-desc">We care about your data in our privacy policy.</span> </div>

        </div>

      </div>
    </div>
  </div>
          `);
  }, []);

  return (
    <footer>
      {/* <AnimatedWrapper from="bottom" delay={0.2}> */}
        {/* <section className="upper-footer py-[48px]">
          <Container>
            <Card className="p-4 border border-[#EAECF0] rounded-[16px]">
              <Row>
                <Col md={5}>
                  <h3 className="text-xl font-semibold text-[#101828]">
                    Have More Questions?
                  </h3>
                  <p className="text-[#475467] text-xl">
                    If you need help or have any questions, contact us on one of
                    our social channels.
                  </p>
                  <br />
                  <a href="">
                    <Image
                      width={175}
                      height={24}
                      src="/images/footer/gitbook.svg"
                      alt="image"
                    />
                  </a>
                  <br />
                  <h3 className="text-xl font-semibold text-[#101828]">
                    Contact Support
                  </h3>
                  <p className="text-[#475467] text-xl">
                    Join the ArmSwap community and ask away!
                  </p>
                  <br />
                  <>
                    {socialLinks?.map((item: any, i: number) => {
                      return (
                        <a
                          className="flex p-[10px] gap-3"
                          href={item?.attributes?.url}
                          key={i}
                        >
                          <Image
                            className="color-change"
                            width={24}
                            height={24}
                            src={imgPath(
                              item?.attributes?.image?.data?.attributes?.url
                            )}
                            alt="image"
                          />
                          <span className="text-[#298DFE] font-[600] text-[16px] leading-[24px]">
                            {item?.attributes?.title}
                          </span>
                        </a>
                      );
                    })}
                  </>
                </Col>
                <Col
                  md={7}
                  className="flex items-center flex-col justify-center cool"
                >
                  <>
                    <div>
                      <Script
                        id="bf535e1f-56d7-440a-ab8f-9b261605d0fb"
                        src="http://192.168.100.166:8080/static/simplified/form/form-entry.js"
                        data-yt-url="http://192.168.100.166:8080"
                        data-theme="light"
                        data-lang="en"
                        strategy="afterInteractive" // Load after the page becomes interactive
                      />
                    </div>
                  </>
                </Col>
              </Row>
            </Card>
          </Container>
        </section> */}
        <section className="bg-[#eff6fd] my-[20px] py-3">
          <Container>
            <Row>
              <Col md={6} className="flex items-center justify-center">
                <h3 className="join-community">
                  Join the ARMswap Vibrant Community
                </h3>
              </Col>
              <Col md={6}>
                <div>
                  <SubscribeForm />
                  <span className="join-community-desc">
                    We care about your data read our{" "}
                    <a
                      className="text-[#4389da]"
                      href={`${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`}
                    >
                      privacy policy.
                    </a>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* {htmlContent ? (
          <section className="bg-[#eff6fd] my-[20px]">
            <Container>
              <Row>
                <Col md={12}>
                  <div
                    className="my-3"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </Col>
              </Row>
            </Container>
          </section>
        ) : (
          <></>
        )} */}
        <FooterLinks quickLinks={quickLinks} />

        <section className="lower-footer py-[20px] border-t border-t-[#EAECF0]">
          <Container>
            <div className="lg:flex justify-between items-center">
              <Link href="/">
                <Image
                  width={122}
                  height={40}
                  src="/armswap_landscape_logo.svg"
                  alt="image"
                />
              </Link>
              <div className="flex gap-4">
                {socialLinks?.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      <Link
                        target="_blank"
                        href={item.url}
                        className="pl-[10px]"
                      >
                        <Image
                          src={imgPath(item.image.url)}
                          alt={item.title}
                          height={24}
                          width={24}
                          className="apply-blue-filter"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <br />
            <p className="text-[16px] max-[768px]:text-[16px]">
              Copyright © {currentYear} ARMswap UAB. All rights reserved.
            </p>
       
            <p className="text-[10px] max-[768px]:text-[16px] py-[5px] text-[#818181]">
              Cryptocurrency investments are inherently risky. Conduct your own
              research and understand the potential downsides before using our
              platform or ARMSP tokens. We (ARMswap and all its
              affiliates/partners) are not financial advisors and cannot provide
              investment advice. You are solely responsible for your financial
              decisions. Please see our{" "}
              <a
                className="text-[#4389da]"
                href={`${process.env.NEXT_PUBLIC_WEB_URL}/terms-and-conditions`}
              >
                {" "}
                Terms and Conditions
              </a>{" "}
              (including{" "}
              <a
                className="text-[#4389da]"
                target="_blank"
                href={`https://token.armswap.com/risk-disclosure`}
              >
                {" "}
                Risk Disclosures
              </a>{" "}
              ) for full details. We prioritize transparency and informed user
              choices.
            </p>
       
            <p className="text-[10px] max-[768px]:text-[16px] py-[5px] text-[#818181]">
              Holding ARMSP tokens does not create a fiduciary or partnership
              relationship with us, nor grant management, equity, or similar
              rights. ARMSP is not a security and does not provide security or
              derivative rights. Our DeFi platform does not offer leverage,
              derivatives, CFDs, or margin trading.{" "}
            </p>
       
            <p className="text-[10px] max-[768px]:text-[16px] py-[5px] text-[#818181]">
              We connect to your existing wallet; we don&apos;t provide wallets
              or handle installation. We rely on pre-programmed contracts to
              execute them. Due to smart contract automation, we have limited
              control over the process itself. Everything relies on the smart
              contract&apos;s code.{" "}
            </p>
       
            <p className="font-bold text-[10px] max-[768px]:text-[16px] py-[5px] text-[#a6a6a6]">
              Please note that the ARMSP Token sale is not available to
              residents or citizens of the North Korea, Iran and Myanmar.{" "}
            </p>
            {/* <p>
              {`ARMswap is a cross-chain swapping platform designed to facilitate seamless token exchanges. Our services are regulated in accordance with applicable financial regulations. ARM Financial Ltd. is also registered with the Financial Conduct Authority to offer Blockchain services via its subsidiary ARMswap in compliance with regulatory requirements – under the Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017. We are authorized by the <Regulatory /body name> for our cross-chain services under the umbrella of ARM Financial. Use of ARMswap is governed by the laws of < Country name> and subject to the exclusive jurisdiction of the competent courts in < Country name>. For more information, please refer to our`}
              <Link href={"/terms-and-conditions"} className="text-[#298DFE]">
                {" "}
                Terms and Policies.
              </Link>
            </p> */}
  
            {/* <p className="text-[16px] max-[768px]:text-[16px]">
              ARM Financial Group UK Ltd and its associated entities are
              entirely separate from and unaffiliated with ARM Limited. Our
              company operates exclusively in the financial services sector. The
              adoption and use of “ARM” in our company name is without any
              intent to mislead, cause harm, or gain undue benefits. It is a
              reflection of our established presence in the financial sector.
            </p> */}
            <br />
            <a href="mailto:Support@armswap.com">
              <Image
                width={200}
                height={18}
                src="/images/footer/support-mail.svg"
                alt="image"
              />
            </a>
          </Container>
        </section>
      {/* </AnimatedWrapper> */}
    </footer>
  );
}
