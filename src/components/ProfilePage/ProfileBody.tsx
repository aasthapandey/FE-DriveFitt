"use client";
import Image from "next/image";
import { ProfilePageData } from "@/types/staticPages";

interface ProfileBodyProps {
  data: ProfilePageData;
  isMobile?: boolean;
}

const ProfileBody = ({ data, isMobile }: ProfileBodyProps) => {
  const { userInfo, actions } = data;

  const handleAction = (actionType: string) => {
    console.log(`${actionType} clicked`);
  };

  const renderActionButton = (action: any, actionType: string) => {
    if (action.isButton) {
      return (
        <button
          onClick={() => handleAction(actionType)}
          className="bg-[#00DBDC] text-black font-normal text-sm leading-5 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 self-start"
        >
          {action.text}
        </button>
      );
    }

    return (
      <button
        onClick={() => handleAction(actionType)}
        className={`font-normal text-sm leading-5 transition-colors duration-200 self-start ${
          action.enabled
            ? "text-[#00DBDC] hover:text-[#00DBDC]/80"
            : "text-[#8A8A8A] cursor-not-allowed"
        }`}
        disabled={!action.enabled}
      >
        {action.text}
      </button>
    );
  };

  const renderMobileActionButton = (action: any, actionType: string) => {
    if (action.isButton) {
      return (
        <button
          onClick={() => handleAction(actionType)}
          className="bg-[#00DBDC] text-black font-normal text-xs leading-5 px-3 py-1.5 rounded-lg hover:bg-opacity-90 transition-all duration-200 self-start"
        >
          {action.text}
        </button>
      );
    }

    return (
      <button
        onClick={() => handleAction(actionType)}
        className={`font-normal text-xs leading-5 transition-colors duration-200 self-start ${
          action.enabled
            ? "text-[#00DBDC] hover:text-[#00DBDC]/80"
            : "text-[#8A8A8A] cursor-not-allowed"
        }`}
        disabled={!action.enabled}
      >
        {action.text}
      </button>
    );
  };

  if (isMobile) {
    return (
      <div className="mx-[24px] mt-[48px] mb-[60px]">
        <div
          className="py-[40px] px-[24px] rounded-[20px]"
          style={{
            background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
            border: "2px solid #333333",
          }}
        >
          <div className="flex flex-col">
            <div className="flex justify-center mb-[32px]">
              <Image
                src="/images/profile.svg"
                alt="Profile"
                width={96}
                height={96}
                className="w-[96px] h-[96px]"
              />
            </div>

            <div className="w-full space-y-[24px]">
              <div className="flex flex-col">
                <span className="font-light text-xs leading-4 mb-1 text-[#8A8A8A]">
                  Name
                </span>
                <span className="font-normal text-xl leading-7 mb-2 text-white">
                  {userInfo.name}
                </span>
                {renderMobileActionButton(actions.changeName, "changeName")}
              </div>

              <div className="flex flex-col">
                <span className="font-light text-xs leading-4 mb-1 text-[#8A8A8A]">
                  Email
                </span>
                <span className="font-normal text-xl leading-7 mb-2 text-white">
                  {userInfo.email}
                </span>
                {renderMobileActionButton(actions.changeEmail, "changeEmail")}
              </div>

              <div className="flex flex-col">
                <span className="font-light text-xs leading-4 mb-1 text-[#8A8A8A]">
                  Phone number
                </span>
                <span className="font-normal text-xl leading-7 mb-2 text-white">
                  {userInfo.phone}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-light text-xs leading-4 mb-1 text-[#8A8A8A]">
                  Date of birth
                </span>
                <span className="font-normal text-xl leading-7 mb-2 text-white">
                  {userInfo.dateOfBirth}
                </span>
                {renderMobileActionButton(
                  actions.changeBirthday,
                  "changeBirthday"
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-light text-xs leading-4 mb-1 text-[#8A8A8A]">
                  Plan expires
                </span>
                <span className="font-normal text-xl leading-7 mb-2 text-white">
                  {userInfo.planExpires}
                </span>
                {renderMobileActionButton(actions.renewPlan, "renewPlan")}
              </div>

              <div className="flex flex-col">
                <span className="font-light text-xs leading-4 mb-1 text-[#8A8A8A]">
                  Active plan
                </span>
                <span className="font-normal text-xl leading-7 mb-2 text-white">
                  {userInfo.activePlan}
                </span>
                {renderMobileActionButton(actions.viewPlan, "viewPlan")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-[120px] mt-[40px] mb-[140px]">
      <div
        className="pt-[80px] pl-[80px] pb-[80px] pr-[167px] rounded-[40px]"
        style={{
          background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
          border: "2px solid #333333",
        }}
      >
        <div className="flex gap-[84px]">
          <div className="flex-shrink-0">
            <Image
              src="/images/profile.svg"
              alt="Profile"
              width={150}
              height={150}
              className="w-[150px] h-[150px]"
            />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-[84px]">
            <div className="space-y-[68px]">
              <div className="flex flex-col">
                <span className="font-light text-base leading-5 mb-2 text-[#8A8A8A]">
                  Name
                </span>
                <span className="font-normal text-2xl leading-7 mb-5 text-white">
                  {userInfo.name}
                </span>
                {renderActionButton(actions.changeName, "changeName")}
              </div>

              <div className="flex flex-col">
                <span className="font-light text-base leading-5 mb-2 text-[#8A8A8A]">
                  Phone number
                </span>
                <span className="font-normal text-2xl leading-7 mb-5 text-white">
                  {userInfo.phone}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-light text-base leading-5 mb-2 text-[#8A8A8A]">
                  Active plan
                </span>
                <span className="font-normal text-2xl leading-7 mb-5 text-white">
                  {userInfo.activePlan}
                </span>
                {renderActionButton(actions.viewPlan, "viewPlan")}
              </div>
            </div>

            <div className="space-y-[68px]">
              <div className="flex flex-col">
                <span className="font-light text-base leading-5 mb-2 text-[#8A8A8A]">
                  Email
                </span>
                <span className="font-normal text-2xl leading-7 mb-5 text-white">
                  {userInfo.email}
                </span>
                {renderActionButton(actions.changeEmail, "changeEmail")}
              </div>

              <div className="flex flex-col">
                <span className="font-light text-base leading-5 mb-2 text-[#8A8A8A]">
                  Date of birth
                </span>
                <span className="font-normal text-2xl leading-7 mb-5 text-white">
                  {userInfo.dateOfBirth}
                </span>
                {renderActionButton(actions.changeBirthday, "changeBirthday")}
              </div>

              <div className="flex flex-col">
                <span className="font-light text-base leading-5 mb-2 text-[#8A8A8A]">
                  Plan expires
                </span>
                <span className="font-normal text-2xl leading-7 mb-5 text-white">
                  {userInfo.planExpires}
                </span>
                {renderActionButton(actions.renewPlan, "renewPlan")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
