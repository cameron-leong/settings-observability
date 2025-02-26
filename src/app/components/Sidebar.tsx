import React, { useState } from "react";
import styled from "styled-components";
import { Accordion, SingleExpanded } from "@dynatrace/strato-components-preview/content";
import { Spacings } from "@dynatrace/strato-design-tokens";
import Colors from "@dynatrace/strato-design-tokens/colors";
import Borders from '@dynatrace/strato-design-tokens/borders';
import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import { AccordionComponent } from "./Accordion";

const SidebarItem = styled("div")<{ selected?: boolean; main?: boolean }>`
  cursor: pointer;
  padding: ${Spacings.Size8} ${Spacings.Size16};
  border-radius: ${Borders.Radius.Container.Subdued};
  background-color: ${(props) =>
    props.selected ? Colors.Background.Container.Primary.Emphasized : 'transparent'};
  color: ${(props) =>
    props.selected
      ? props.main
        ? Colors.Text.Neutral.DefaultActive
        : Colors.Theme.Primary[90]
      : Colors.Text.Neutral.Default};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.main ? "transparent" : Colors.Theme.Neutral[40]};
  }
`;

export const SideBar = ({ title, subtitle, items }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <Page.Sidebar keepMounted>
      <TitleBar>
        <TitleBar.Title>{title}</TitleBar.Title>
        <TitleBar.Subtitle>{subtitle}</TitleBar.Subtitle>
      </TitleBar>
      <Accordion defaultExpanded={["Anomaly detection", "Operational settings"]} multiple showDividers={false}>
        {items.map((section, index) => (
          <Accordion.Section key={index} id={section.category}>
            <Accordion.SectionLabel>{section.category}</Accordion.SectionLabel>
            <Accordion.SectionContent>
              {section.items.map((item, idx) => (
                <SidebarItem
                  key={idx}
                  selected={selectedItem === item}
                  onClick={() => setSelectedItem(item)}
                >
                  {item}
                </SidebarItem>
              ))}
            </Accordion.SectionContent>
          </Accordion.Section>
        ))}
      </Accordion>
    </Page.Sidebar>
  );
};