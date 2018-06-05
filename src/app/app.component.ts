import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpObserve} from "@angular/common/http/src/client";
import {isArray} from "util";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(private http: HttpClient) {
    }

    result: string = 'Select the rating';

    ratingArray = [
        new Rating('A**', 'AAAAA'),
        new Rating('A*', 'AAAA'),
        new Rating('A++', 'AAA'),
        new Rating('A+', 'AA'),
        new Rating('A', 'A'),
        new Rating('B', 'B'),
        new Rating('C', 'C'),
        new Rating('D', 'D'),
    ];

    onSelectChange(newValue: string) {
        this.sendRequest(newValue);
        this.result = 'Loading...'
    }

    private static url = 'https://api.zonky.cz/loans/marketplace?fields=id,amount&&rating__eq=';

    private loadAllItems(v: string, totalNumber: number) {
        const options = {
            headers: new HttpHeaders().set('X-Size', totalNumber.toString()),
        };
        this.http.get(AppComponent.url + v, options).subscribe(res => {
            this.calculateAverage(res)
        });
    }

    private calculateAverage(res: any) {
        let sum = 0;
        let q = 0;
        if (isArray(res)) {
            res.forEach(value => {
                if (value.hasOwnProperty('amount')) {
                    sum += value.amount;
                    q++;
                } else {
                    console.warn('Can\'t parse loan object: ', value)
                }
            });

            let avg = sum / q;
            this.result = 'Average amount: ' + avg.toFixed(2)
        }
        else {
            this.result = 'No loans available'
        }
    }

    private sendRequest(v: string) {
        let httpObserve: HttpObserve = 'response';
        const options = {
            headers: new HttpHeaders().set('X-Size', '1'),
            observe: httpObserve,
        };
        this.http.head(AppComponent.url + v, options).subscribe(res => {
            let sNumber = res.headers.get('X-Total');
            let number = parseInt(sNumber);
            this.loadAllItems(v, number)
        });

    }

}

class Rating {
    name: string;
    value: string;

    constructor(name, value: string) {
        this.name = name;
        this.value = value;
    }
}
