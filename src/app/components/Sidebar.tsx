import React, { useState } from "react";
import styled from "styled-components";
import { Accordion, SingleExpanded } from "@dynatrace/strato-components-preview/content";
import { Spacings } from "@dynatrace/strato-design-tokens";
import Colors from "@dynatrace/strato-design-tokens/colors";
import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import { AccordionComponent } from "./Accordion";

//Set style for each item within the sidebar
const SidebarItem = styled("div")<{ selected?: boolean; main?: boolean }>`
  cursor: pointer;
  padding: ${Spacings.Size8} ${Spacings.Size16};
  border-radius: ${Spacings.Size4};
  background-color: transparent;
  color: ${(props) =>
    props.selected
      ? props.main
        ? Colors.Text.Neutral.Default /* No color change for main items */
        : Colors.Theme.Primary[90]
      : Colors.Text.Neutral.Default};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.main ? "transparent" : Colors.Theme.Neutral[40]};
  }
`;




export const SideBar = ({title, subtitle, items}) => {
  const [singleSection, setSingleSection] = useState<SingleExpanded>('');
  return (
      <Page.Sidebar keepMounted>
        <TitleBar>
          <TitleBar.Title>{title}</TitleBar.Title>
          <TitleBar.Subtitle>{subtitle}</TitleBar.Subtitle>
        </TitleBar>
        <Accordion defaultExpanded={["Anomaly detection", "Operational settings"]} multiple>
            {items.map((section, index) => (
              <Accordion.Section key={index} id={section.category}>
                <Accordion.SectionLabel>{section.category}</Accordion.SectionLabel>
                <Accordion.SectionContent>
                  {section.items.map((item, idx) => (
                    <SidebarItem key={idx}>
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
