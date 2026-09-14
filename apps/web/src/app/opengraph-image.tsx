import {
  ImageResponse,
} from "next/og";


// ============================================================
// IMAGE METADATA
// ============================================================

export const alt =
  "Media Polarization Lab — Climate coverage divergence research";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";


// ============================================================
// IMAGE
// ============================================================

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "#fbfaf7",
          color:
            "#171716",
          padding:
            "64px 72px",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        {/* ================================================== */}
        {/* TOP */}
        {/* ================================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            {/* Brand mark */}

            <div
              style={{
                width: "54px",
                height: "54px",
                border:
                  "2px solid #171716",
                borderRadius:
                  "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius:
                    "999px",
                  background:
                    "#171716",
                }}
              />
            </div>


            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize:
                    "26px",
                  fontWeight:
                    700,
                  letterSpacing:
                    "-0.8px",
                }}
              >
                Media Polarization Lab
              </div>

              <div
                style={{
                  marginTop:
                    "6px",
                  fontSize:
                    "14px",
                  color:
                    "#6f6c65",
                  letterSpacing:
                    "2px",
                  textTransform:
                    "uppercase",
                }}
              >
                Climate coverage research
              </div>
            </div>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              border:
                "1px solid #dedbd3",
              borderRadius:
                "999px",
              padding:
                "10px 16px",
              fontSize:
                "15px",
              color:
                "#6f6c65",
            }}
          >
            2016–2026
          </div>
        </div>


        {/* ================================================== */}
        {/* CENTER */}
        {/* ================================================== */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth:
              "1000px",
          }}
        >
          <div
            style={{
              fontSize:
                "70px",
              lineHeight:
                1.02,
              fontWeight:
                700,
              letterSpacing:
                "-3.5px",
            }}
          >
            News outlets are becoming more different
            in how they frame climate impacts.
          </div>


          <div
            style={{
              marginTop:
                "30px",
              maxWidth:
                "850px",
              fontSize:
                "25px",
              lineHeight:
                1.4,
              color:
                "#6f6c65",
            }}
          >
            A longitudinal semantic analysis of
            climate-theme divergence across U.S.
            news outlets.
          </div>
        </div>


        {/* ================================================== */}
        {/* BOTTOM */}
        {/* ================================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap:
                "12px",
            }}
          >
            <Pill label="136 outlets" />

            <Pill label="116 months" />

            <Pill label="6 climate dimensions" />
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap:
                "12px",
              color:
                "#6f6c65",
              fontSize:
                "16px",
            }}
          >
            <div>
              Semantic divergence
            </div>

            <div
              style={{
                width:
                  "42px",
                height:
                  "1px",
                background:
                  "#171716",
              }}
            />

            <div>
              Not ideology by itself
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}


// ============================================================
// PILL
// ============================================================

function Pill({
  label,
}: {
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border:
          "1px solid #dedbd3",
        borderRadius:
          "999px",
        padding:
          "10px 15px",
        fontSize:
          "15px",
        color:
          "#6f6c65",
      }}
    >
      {label}
    </div>
  );
}