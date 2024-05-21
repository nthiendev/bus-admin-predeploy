import { useSelector } from "@/store/hooks";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { AppState } from "@/store/store";
import Image from "next/image";

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "60px" : "250px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  }));

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === "dark" ? (
          <Image
            src={"/images/logos/logo.png"}
            alt="logo"
            height={customizer.TopbarHeight}
            width={90}
            priority
          />
        ) : (
          <Image
            src={"/images/logos/logo.png"}
            alt="logo"
            height={50}
            width={60}
            priority
          />
        )}
        <span
          style={{
            marginLeft: 5,
            fontSize: "18px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: customizer.activeMode === "dark" ? "#fff" : "#000",
            fontWeight: "bold",
          }}
        >
          Kidcommutesafe
        </span>
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === "dark" ? (
        <Image
          src={"/images/logos/logo.png"}
          alt="logo"
          height={customizer.TopbarHeight}
          width={90}
          priority
        />
      ) : (
        <Image
          src={"/images/logos/logo.png"}
          alt="logo"
          height={customizer.TopbarHeight}
          width={90}
          priority
        />
      )}
      <span
        style={{
          marginLeft: 5,
          fontSize: "18px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: customizer.activeMode === "dark" ? "#fff" : "#000",
          fontWeight: "bold",
        }}
      >
        Kidcommutesafe
      </span>
    </LinkStyled>
  );
};

export default Logo;
