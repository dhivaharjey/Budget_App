import { UserPlusIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import illustration from "../assets/illustration.jpg";
const FrontPage = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const focusInput = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      focusInput.current.focus();
    }
  }, [isSubmitting]);

  return (
    <>
      <div className="intro">
        <div>
          <h1>
            Take control of <span className="accent">Your Money</span>
          </h1>
          <p>
            Personal budgetting is the secret to financial freedom.Start your
            journey today.
          </p>
          <fetcher.Form method="post">
            <input
              type="text"
              name="userName"
              required
              placeholder="What is your name?"
              aria-label="Your Name"
              autoComplete="given-name"
              ref={focusInput}
            />
            <input type="hidden" name="_action" value="newUser" />
            <button
              className="btn btn--dark"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <p>Creating...</p>
              ) : (
                <>
                  <span>Create Account</span>
                  <UserPlusIcon width={20} />
                </>
              )}
            </button>
          </fetcher.Form>
        </div>
        <img src={illustration} alt="Person with money" />
      </div>
    </>
  );
};

export default FrontPage;
