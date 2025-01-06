export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1_123)">
          <path
            d="M38.1422 5.85781C34.3647 2.08031 29.3422 0 24 0C18.6578 0 13.6353 2.08031 9.85781 5.85781C6.08031 9.63531 4 14.6578 4 20C4 25.3422 6.08039 30.3646 9.85781 34.1422C13.6352 37.9198 18.6578 40 24 40C29.3422 40 34.3647 37.9197 38.1422 34.1422C41.9197 30.3647 44 25.3422 44 20C44 14.6578 41.9196 9.63539 38.1422 5.85781Z"
            fill="#059669"
          />
          <g clipPath="url(#clip0_1_123)">
            <path
              d="M24.5714 8V33.1429"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30.2857 12.5714H21.7143C20.6534 12.5714 19.636 12.9929 18.8859 13.743C18.1357 14.4931 17.7143 15.5106 17.7143 16.5714C17.7143 17.6323 18.1357 18.6497 18.8859 19.3999C19.636 20.15 20.6534 20.5714 21.7143 20.5714H27.4286C28.4894 20.5714 29.5069 20.9929 30.257 21.743C31.0071 22.4931 31.4286 23.5106 31.4286 24.5714C31.4286 25.6323 31.0071 26.6497 30.257 27.3999C29.5069 28.15 28.4894 28.5714 27.4286 28.5714H17.7143"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_1_123"
            x="0"
            y="0"
            width="48"
            height="48"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_123"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_123"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_1_123">
            <rect
              width="27.4286"
              height="27.4286"
              fill="white"
              transform="translate(10.8571 6.85715)"
            />
          </clipPath>
        </defs>
      </svg>

      <span className="mb-2 font-semibold text-white capitalize">
        mensalize
      </span>
    </div>
  )
}
