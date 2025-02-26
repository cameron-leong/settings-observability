import React from 'react';

import { Accordion } from '@dynatrace/strato-components-preview/content';


const items = [
    {
        category: "Anomaly detection",
        items: ["Infrastructure", "Services", "Davis Anomaly Detectors"]
    },
    {
        category: "Operational settings",
        items: ["Management zones", "Alerting profiles", "Problem notifications"]
    }
];
  

export const AccordionComponent = () => {
    return (
      <Accordion defaultExpanded={[0, 1]} multiple>
        {items.map((section, index) => (
          <Accordion.Section key={index} id={section.category.replace(/\s+/g, '')}>
            <Accordion.SectionLabel>{section.category}</Accordion.SectionLabel>
            <Accordion.SectionContent>
              {section.items.map((item, idx) => (
                <div key={idx}>{item}</div>
              ))}
            </Accordion.SectionContent>
          </Accordion.Section>
        ))}
      </Accordion>
    );
  };