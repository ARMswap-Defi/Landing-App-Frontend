import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false); // Default modal open
  const [showPreferences, setShowPreferences] = useState(false); // Show preferences section
  const [cookiePreferences, setCookiePreferences] = useState({
    restrictedCookies: true,
    performanceCookies: true,
    functionalCookies: true,
  });

  // Load cookie preferences on mount
  useEffect(() => {
    const storedPreferences = Cookies.get("cookieConsent");
    if (storedPreferences) {
      setCookiePreferences(JSON.parse(storedPreferences));
      setIsOpen(false); // Close the modal if consent was already given
    } else {
      setIsOpen(true);
    }
  }, []);

  // Handle Accept All Cookies
  const handleAcceptAll = () => {
    const consent = {
      restrictedCookies: true,
      performanceCookies: true,
      functionalCookies: true,
    };
    setCookiePreferences(consent);
    Cookies.set("cookieConsent", JSON.stringify(consent), {
      expires: 365,
    });
    setIsOpen(false);
  };
  // Handle Reject All Non-Essential
  const handleRejectAllNonEssential = () => {
    const consent = {
      restrictedCookies: false,
      performanceCookies: false,
      functionalCookies: false,
    };
    setCookiePreferences(consent);
    Cookies.set("cookieConsent", JSON.stringify(consent), { expires: 365 });
    setIsOpen(false);
  };

  // Handle Confirm Preferences
  const handleConfirmPreferences = () => {
    Cookies.set("cookieConsent", JSON.stringify(cookiePreferences), {
      expires: 365,
    });
    setIsOpen(false);
  };

  return isOpen ? (
    <div>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed bottom-0 rounded-[20px] right-0 bg-[#f2f4f5] shadow-lg text-white p-4 z-50 m-[10px]">
        <div className="sm:min-w-[330px] sm:max-w-[550px] mx-auto">
          <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-bold text-[#212529]">
            {showPreferences ? "Manage Cookies Preferences" : ""}
          </h2>

          {/* Cookie Management Section */}
          {!showPreferences && (
            <>
              <p className="text-[#212529] text-[15px]">
                ARMswap and our partners may use cookies and other technologies
                as outlined in our{" "}
                <Link href={"/cookies-policy"} className="text-[#298DFE]">
                  {" "}
                  Cookie Policy
                </Link>
                , to process your personal data. You can manage your cookie
                preferences below. By using our platform, you consent to data
                collection through cookies and similar technologies as detailed
                in our{" "}
                <Link href={"/privacy-policy"} className="text-[#298DFE]">
                  {" "}
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="md:flex justify-between mt-4">
                <button
                  onClick={handleRejectAllNonEssential}
                  className=" max-[768px]:block max-[600px]:mb-[10px]  primary-btn-link bg-[#298DFE] text-white py-[6px] px-[12px] max-[768px]:w-full text-sm font-semibold rounded-lg mr-2"
                >
                  Reject All Non-Essential
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="max-[768px]:block max-[600px]:mb-[10px]   primary-btn-link bg-[#298DFE] text-white py-[6px] px-[12px] max-[768px]:w-full text-sm font-semibold rounded-lg md:mr-2"
                >
                  Manage Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="max-[768px]:block max-[600px]:mb-[10px] primary-btn-link bg-[#298DFE] text-white py-[6px] px-[12px] max-[768px]:w-full text-sm font-semibold rounded-lg md:mr-2"
                >
                  Accept All Cookies
                </button>
              </div>
            </>
          )}

          {/* Manage Preferences Section */}
          {showPreferences && (
            <>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#212529]">Restricted Cookies</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      disabled
                      checked={cookiePreferences.restrictedCookies}
                      onChange={() =>
                        setCookiePreferences((prev) => ({
                          ...prev,
                          restrictedCookies: !prev.restrictedCookies,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-[#7f7f7f] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer-checked:bg-[#7f7f7f] transition-colors duration-300 ease-in-out`}
                    ></div>
                    <span
                      className={`absolute left-[4px] top-[4px] w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ease-in-out peer-checked:translate-x-full`}
                    ></span>
                  </label>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#212529]">Performance Cookies</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.performanceCookies}
                      onChange={() =>
                        setCookiePreferences((prev) => ({
                          ...prev,
                          performanceCookies: !prev.performanceCookies,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-[#96bbf9] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-300 ease-in-out`}
                    ></div>
                    <span
                      className={`absolute left-[4px] top-[4px] w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ease-in-out peer-checked:translate-x-full`}
                    ></span>
                  </label>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#212529]">Functional Cookies</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.functionalCookies}
                      onChange={() =>
                        setCookiePreferences((prev) => ({
                          ...prev,
                          functionalCookies: !prev.functionalCookies,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-[#96bbf9] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-300 ease-in-out`}
                    ></div>
                    <span
                      className={`absolute left-[4px] top-[4px] w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ease-in-out peer-checked:translate-x-full`}
                    ></span>
                  </label>
                </div>
              </div>

              {/* Buttons for Manage Preferences */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleConfirmPreferences}
                  className="primary-btn-link bg-[#298DFE] text-white py-[6px] px-[12px]  text-sm font-semibold rounded-lg mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={handleRejectAllNonEssential}
                  className="primary-btn-link bg-[#298DFE] text-white py-[6px] px-[12px]  text-sm font-semibold rounded-lg mr-2"
                >
                  Reject All Non-Essential
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default CookieConsent;
